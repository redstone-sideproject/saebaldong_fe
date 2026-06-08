import Link from 'next/link'
import { Fragment } from 'react'

interface FaqAnswerProps {
  answer: string
}

const SITE_DOMAIN = 'saebaldong.kr'

// "saebaldong.kr/경로" 토큰을 캡처 (캡처 그룹 = 내부 경로)
const INTERNAL_LINK_PATTERN = /saebaldong\.kr(\/[\w/-]*)/g

/**
 * FAQ 답변 문자열을 렌더링하며 내부 URL을 클릭 가능한 링크로 변환한다.
 * 표시 텍스트는 원문(faqList.answer)과 동일하게 유지하여 JSON-LD 스키마와의
 * 일관성(구조화 데이터 = 화면 노출 내용)을 보장한다.
 * @param answer - FAQ 답변 원문
 */
export default function FaqAnswer({ answer }: FaqAnswerProps) {
  // 캡처 그룹이 있는 split 결과는 [텍스트, 경로, 텍스트, 경로, ...] 형태로,
  // 홀수 인덱스가 내부 경로가 된다.
  const parts = answer.split(INTERNAL_LINK_PATTERN)

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <Link
            key={`${index}-${part}`}
            href={part}
            className="text-primary hover:underline"
          >
            {SITE_DOMAIN}
            {part}
          </Link>
        ) : (
          <Fragment key={`${index}-${part}`}>{part}</Fragment>
        ),
      )}
    </>
  )
}
