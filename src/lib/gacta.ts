import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google'

import { GA_CTA_EVENT } from '@/types/constants'

export function gacta(eventLabel: GA_CTA_EVENT) {
  sendGAEvent('event', eventLabel)
  sendGTMEvent('event', eventLabel)
}
