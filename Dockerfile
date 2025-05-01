# 1. 공식 Node.js 이미지 사용
FROM node:20.18-alpine AS builder

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 설치를 위한 패키지 파일 복사
COPY package.json yarn.lock ./

# 4. 의존성 설치
RUN yarn install

# 5. 애플리케이션 소스 코드 복사
COPY . .

# 6. Next.js 애플리케이션 빌드
RUN yarn run build


# 8. Production Stage
FROM node:20.18-alpine

WORKDIR /app

# 9. prod 실행에 필요한 파일만 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 10. PM2 설치
RUN npm install -g pm2

# 11. 컨테이너가 사용할 포트 노출
EXPOSE 3000

# 12. PM2를 통해 Next.js 애플리케이션 실행
CMD ["pm2-runtime", "start", "server.js"]