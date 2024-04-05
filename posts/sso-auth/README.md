---
date: 2020-03-21
spot: 郎景园
sort: Computer Science
tags:
  - SSO
  - Authentication
  - Authorization
  - SLO
  - OIDC
  - SAML
  - OAuth
  - PKCE
  - JWT
  - IdAM
  - Security
---

# 单点登录 (Single Sign-On) 身份验证

![Orca exhaling](./salish-sea-orca-exhaling.jpg "Permitted under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (image resized). © [**liamkmc**](https://www.inaturalist.org/people/liamkmc). [*inaturalist.org*](https://www.inaturalist.org/photos/106254096).")

最近参与的项目涉及到单点登录相关的功能，得以顺便补一些这方面的知识。虽然自己平时作为用户也没少用到单点登录，但对实现它的方案并没有概念。本文总结单点登录流程中的一些关键点。

## 基本概念

- **authentication (认证)**：验证一个人身份的过程，最常见的就是“账号登录”。
- **authorization (授权)**：验证一个人是否有权限执行某些操作的过程。

"authentication" 和 "authorization" 这俩单词的该死之处在于，前四个字母都是 auth，而 auth 经常被作为缩写使用，因而很容易被混淆。

比如 OAuth[^oauth]，如果没有了解过它，单看名字你能判断它的 "Auth" 是指 Authentication 还是 Authorization 吗？显然不能。只有在了解 OAuth 之后，才能搞清楚它是用于 Authorization。更具体地说，OAuth 提供了一个标准的流程：将 `实体 1`（如用户）在 `实体 2`（如某网站）拥有的某些权限授予 `实体 3`（如第三方网站）[^oauth_simp]。

[^oauth]: [OAuth Community Site](https://oauth.net/)
[^oauth_simp]: [OAuth 2 Simplified](https://aaronparecki.com/oauth-2-simplified/)

单点登录显然属于 authentication。

## 主流协议

目前应用比较广泛的支持 SSO 的开放标准主要有 **OIDC (OpenID Connect)**[^oidc] 和 **SAML (Security Assertion Markup Language) 2.0**[^saml]。OIDC 是基于 OAuth 2.0 的认证协议，它在 OAuth 的流程之上，增加了认证用户的标准化步骤 [^oidc_how]。而 SAML 在此之前我并没听说过，这个标准似乎在企业用户领域应用得比较多。比如 GitHub 关于 SAML 的文档也是归类在 Enterprise Cloud 中 [^gh_saml]。

[^oidc]: [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0-final.html)
[^saml]: [Security Assertion Markup Language (SAML) v2.0](https://www.oasis-open.org/standard/saml/)
[^oidc_how]: [What is OpenID Connect](https://openid.net/developers/how-connect-works/)
[^gh_saml]: [Authenticating with SAML single sign-on](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on)

## 典型流程

不管是 OIDC 还是 SAML，它们的运作流程都有一个相似的模式：多个应用使用同一个“中心化”的认证服务进行账户认证，正是这个中心化的认证服务提供了单点登录需要的用户认证状态。一个典型的流程（以 OIDC Authorization Code Flow[^oidc_code_flow] 为例）如下：

[^oidc_code_flow]: [OpenID Connect Core 1.0 - 3.1. Authentication using the Authorization Code Flow](https://openid.net/specs/openid-connect-core-1_0-final.html#CodeFlowAuth)

假设用户还没有登录：

```mermaid
sequenceDiagram
  participant User
  participant Browser
  participant Application 1
  participant OpenID Provider

  User->>Application 1: 1. accesses

  Application 1->Browser: 2. with [Code Challenge][Code Challenge Method]
  Activate Browser
  Browser->>OpenID Provider: redirects to
  Deactivate Browser
  Note over OpenID Provider: /authorize

  OpenID Provider->>User: 3. interacts

  User->>OpenID Provider: 4. with [login credentials]

  OpenID Provider->Browser: 5. with [Authorization Code]
  Activate Browser
  Browser->>Application 1: redirects to
  Deactivate Browser
  Note over Application 1: /callback

  Application 1->>OpenID Provider: 6. with [Authorization Code][Code Verifier]
  Note over OpenID Provider: /token

  OpenID Provider->>Application 1: 7. with [ID Token][Access Token][Refresh Token]

  Application 1->>OpenID Provider: 8. with [Access Token]
  Note over OpenID Provider: /userinfo
```

之后，用户又访问 Application 2：

```mermaid
sequenceDiagram
  participant User
  participant Browser
  participant Application 2
  participant OpenID Provider

  User->>Application 2: 9. accesses

  Application 2->Browser: 10. with [Code Challenge][Code Challenge Method]
  Activate Browser
  Browser->>OpenID Provider: redirects to
  Deactivate Browser
  Note over OpenID Provider: /authorize
  Note over OpenID Provider: User already logged in

  OpenID Provider->Browser: 11. with [Authorization Code]
  Activate Browser
  Browser->>Application 2: redirects to
  Deactivate Browser
  Note over Application 2: /callback

  Application 2->>OpenID Provider: 12. with [Authorization Code][Code Verifier]
  Note over OpenID Provider: /token

  OpenID Provider->>Application 2: 13. with [ID Token][Access Token][Refresh Token]

  Application 2->>OpenID Provider: 14. with [Access Token]
  Note over OpenID Provider: /userinfo
```

### 涉及角色

- `User`：用户。
- `Browser`：浏览器。
- `OpenID Provider`：认证服务，所有接入的应用程序都将其作为用户登录入口。
- `Application 1`：应用程序 1，是 `OpenID Provider` 的客户端 (Client)。在 OIDC 中 `OpenID Provider` 的客户端统称为 **Relying Party**[^rely_party]。
- `Application 2`：应用程序 2。

[^rely_party]: [OpenID Connect Core 1.0 - 1.2. Terminology](https://openid.net/specs/openid-connect-core-1_0-final.html#Terminology)

### 过程说明

1. `User` 访问 `Application 1`（此时用户未在 `Application 1` 登录）；
2. `Application 1` 发出认证请求：将 `Browser` 重定向到 `OpenID Provider` 的 `/authorize` 接口（此时用户未在 `OpenID Provider` 登录）；
    - `Code Challenge` 与 `Code Challenge Method` 用于 PKCE (Proof Key for Code Exchange) 校验[^pkce]；
    - **PKCE** 是对 **OAuth 2.0 Authorization Code Grant**[^auth_code_flow] 的扩展，用于防止 CSRF 和 Authorization Code 注入攻击 [^why_pkce]。
3. `OpenID Provider` 与 `User` 交互，认证 `User` 并询问 `User` 是否允许将其用户信息授权给 `Application 1`；
4. `User` 输入登录信息，`OpenID Provider` 更新 `User` 的 session 信息；
    - 此处假设 `Application 1` 受 `OpenID Provider` 信任，省略了获取 `User` 同意授权的步骤；
5. `Browser` 带着 `OpenID Provider` 生成的 `Authorization Code` 重定向回 `Application 1` 的 `/callback` 接口；
6. `Application 1` 发出 `token` 请求到 `OpenID Provider` 的 `/token` 接口；
    - `Code Verifier` 也是用于 PKCE 校验[^pkce]；
    - 这个步骤 `Application 1` 本身也需要认证 [^client_auth]。
7. `OpenID Provider` 返回 `ID Token`、`Access Token` 和 `Refresh Token`（可选）；
    - `ID Token`: OIDC 对 OAuth 2.0 的主要扩展就是 `ID Token`，使用 JWT 表示[^id_token][^jwt]。
8. `Application 1` 使用 `Access Token` 从 `OpenID Provider` 的 `/userinfo` 获取用户信息。

`9.`~`14.` 的过程类似，由于 `User` 已经在 `OpenID Provider` 登录，所以用户不再需要输入登录信息就可以自动登录 `Application 2`。

[^pkce]: [RFC 7636, Proof Key for Code Exchange by OAuth Public Clients](https://www.rfc-editor.org/rfc/rfc7636)
[^auth_code_flow]: [OAuth 2.0 Authorization Code Grant](https://oauth.net/2/grant-types/authorization-code/)
[^why_pkce]: [RFC 7636: Proof Key for Code Exchange](https://oauth.net/2/pkce/)
[^client_auth]: [RFC 6749, The OAuth 2.0 Authorization Framework - 3.2. Token Endpoint](https://datatracker.ietf.org/doc/html/rfc6749#section-3.2)
[^id_token]: [OpenID Connect Core 1.0 - 2. ID Token](https://openid.net/specs/openid-connect-core-1_0-final.html#IDToken)
[^jwt]: [RFC 7519, JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)

### SAML SP-Initiated SSO

SAML 的 SSO 流程也十分相似，核心也是将认证步骤集中在认证服务（在 SAML 中称为 Identity Provider）：

```mermaid
sequenceDiagram

participant User
participant Browser
participant Application
participant Identity Provider

User->>Application: 1. accesses

Application->Browser: 2. with [SAML Request]
Activate Browser
Browser->>Identity Provider: redirects to
Deactivate Browser
Note over Identity Provider: /SSO URL

Identity Provider->>User: 3. interacts

User->>Identity Provider: 4. with [login credentials]

Identity Provider->Browser: 5. with [SAML Response]
Activate Browser
Browser->>Application: redirects to
Deactivate Browser
Note over Application: /ACS URL

Application->>User: 6. responds to
```

## 单点登出 (Single Logout)

用户登出应用时，应该单独退出具体某个应用？还是同时退出认证服务？还是同时退出所有接入认证服务的应用？

这其实取决于具体应用的业务及其数据敏感等级。例如：

- 对于一家企业来说，假设企业内部的应用都接入了同一个认证服务，那么可以在用户登出时，注销该用户的所有 session，包括认证服务。
- 对于一个接入了社交平台认证服务（Social Provider，如 Facebook）的应用，显然就做不到登出该用户在其社交账户关联的所有应用，因为这些应用之间可能没有任何关系。
- 如果仅注销当前应用 session，则需要提供一个用户未登录时不自动跳转到认证服务的页面。否则用户在登出后自动跳转到认证服务，而认证服务此时还有用户有效的 session，因此又会自动将用户登录到刚登出的应用上。这个效果看起来就像是登出功能不起作用。

## 其他

其他的诸如 `Authorization Code`、`PKCE` 等设计都是从信息安全的角度考量，而正确实现这些设计并不是简单的事情。如果有得选，最好优先使用经过 OpenID Foundation 认证的服务或工具库 [^oidc_certified]。

[^oidc_certified]: [Certified OpenID Connect Implementations](https://openid.net/developers/certified-openid-connect-implementations/)

## Cover

:::details Salish Sea Orcas

封面图是一头萨利希海 (Salish Sea)[^salish_sea]虎鲸 (Orca)[^orca]在呼吸时喷出水雾。

[^salish_sea]: [Salish Sea](https://en.wikipedia.org/wiki/Salish_Sea)
[^orca]: [Orca](https://en.wikipedia.org/wiki/Orca)

萨利希海是美国与加拿大西海岸交界处的一个陆缘海，在这个海湾里定居的虎鲸族群也被称为**南方居留型虎鲸 (Southern Resident orcas)**。居留鲸相对于过客鲸 (Transient) 来说比较“温顺”，它们以鱼类为主食，而过客鲸会猎杀其他大型海洋哺乳动物。萨利希海虎鲸这个族群在 2021 年有 75 头 [^ss_orcas]。

[^ss_orcas]: [Orcas of the Salish Sea](https://www.orcanetwork.org/orca-resource-center/orcas-of-the-salish-sea)

下图也是萨利希海的虎鲸：

![Salish Sea Orcas](./salish-sea-orcas.jpg "Permitted under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (image resized). © [**Antonio Flores**](https://www.inaturalist.org/people/antonioflores). [*inaturalist.org*](https://www.inaturalist.org/photos/70768468).")

:::
