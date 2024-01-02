
import type MarkdownIt from "markdown-it/lib";
import mdImageFigures from "markdown-it-image-figures";
import mdFootnote from "markdown-it-footnote";

function genReferenceSection(md: MarkdownIt) {
  // usage: https://markdown-it.github.io/#fnref1
  md.use(mdFootnote);
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
