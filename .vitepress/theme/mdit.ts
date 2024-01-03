import type MarkdownIt from "markdown-it/lib";
import mdImageFigures from "markdown-it-image-figures";
import mdFootnote from "markdown-it-footnote";

function genReferenceHostname(md: MarkdownIt) {
  md.core.ruler.push("ref_hostname", function genHostname(state) {
    const { tokens } = state;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === "footnote_open"
        && tokens[i + 1].type === "paragraph_open") {
        const fnChildren = tokens[i + 2].children || [];
        const linkOpen = fnChildren[0];
        if (linkOpen.type === "link_open") {
          const dot = new state.Token("text", "", 0);
          dot.content = ". ";
          fnChildren?.push(dot);

          const href = (linkOpen.attrs ? linkOpen.attrs[0] : [])[1];
          if (href) {
            const url = new URL(href);
            const hostname = url.hostname.replace("www.", "");

            const emOpen = new state.Token("em_open", "em", 1);
            fnChildren?.push(emOpen);

            const emHostname = new state.Token("text", "", 0);
            emHostname.content = hostname;
            fnChildren?.push(emHostname);

            const emClose = new state.Token("em_close", "em", -1);
            fnChildren?.push(emClose);
            fnChildren?.push(dot);
          }
        }
      }
    }
  });
}

function renderReferenceSection(md: MarkdownIt) {
  md.renderer.rules.footnote_block_open = () => (`
    <h2 id="references">
      References
      <a class="header-anchor" href="#references"
        aria-label="Permalink to &quot;References&quot;">
        &ZeroWidthSpace;
      </a>
    </h2>
    <section>
      <ol class="footnotes-list">
  `);
}

function genReferenceSection(md: MarkdownIt) {
  // usage: https://markdown-it.github.io/#fnref1
  md.use(mdFootnote);
  renderReferenceSection(md);
  genReferenceHostname(md);
}

function genImageFigures(md: MarkdownIt) {
  // usage: ![alt](https://link-to-image 'title'){.class}
  md.use(mdImageFigures, {
    figcaption: "title",
    copyAttrs: "^class$",
  });
}

export default function useMDItPlugins(md: MarkdownIt) {
  genImageFigures(md);
  genReferenceSection(md);
}
