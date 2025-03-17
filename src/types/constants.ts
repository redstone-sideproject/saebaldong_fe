export const GA_CTA_EVENTS = {
  onClickStreamerDetailCTA: 'click_cta_streamer_detail',
} as const

export type GA_CTA_EVENT = (typeof GA_CTA_EVENTS)[keyof typeof GA_CTA_EVENTS]
