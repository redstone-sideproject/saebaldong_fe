interface JsonLdProps {
  data: Record<string, unknown>
}

/**
 * JSON-LD 구조화 데이터를 페이지에 주입하는 컴포넌트
 * @param data - schema.org 형식의 구조화 데이터 객체
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
