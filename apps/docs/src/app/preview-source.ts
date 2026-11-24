export function translateSource<Labels extends Record<string, string>>(
  source: string, defaults: Labels, labels: Labels,
) {
  return Object.keys(defaults).reduce((code, key) =>
    code.replaceAll(JSON.stringify(defaults[key]), () => JSON.stringify(labels[key])), source.trimEnd())
}
