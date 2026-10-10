/** Renders schema.org nodes as one JSON-LD @graph script. */
export default function JsonLd({ graph }: { graph: object[] }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c"); // CMS text must not be able to close the tag

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
