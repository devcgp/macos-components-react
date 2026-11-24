import tokenSource from '../../../../packages/ui/src/styles/tokens/tokens.json'

export const { colors: tahoeColors, typography: tahoeTypography } = tokenSource
export const tahoeSizes = tokenSource.sizes.modeData
export type TahoeSize = keyof typeof tahoeSizes

export const tahoeSizeOrder = ['mini', 'small', 'medium', 'large', 'xl'] as const satisfies readonly TahoeSize[]
