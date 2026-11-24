import tokenSource from '../../../../packages/ui/src/styles/tokens/tokens.json'

export const { colors: desktopColors, typography: desktopTypography, material: desktopMaterials, context: desktopContexts, icons: desktopIcons } = tokenSource
export const desktopSizes = tokenSource.sizes.modeData
export type DesktopSize = keyof typeof desktopSizes

export const desktopSizeOrder = ['mini', 'small', 'medium', 'large', 'xl'] as const satisfies readonly DesktopSize[]
