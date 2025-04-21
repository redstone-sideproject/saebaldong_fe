'use client'

import type React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

import { requestLogin } from '@/api/admin/loginApi'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TLoginSchema, LoginSchema } from '@/constants/schemas/loginSchema'

export default function AdminLoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    const result = await requestLogin(data)

    if (!result.success) {
      setError('root', {
        message: result.message,
      })
      return
    }
    router.push('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary text-primary-foreground rounded-full p-3">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">관리자 로그인</CardTitle>
          <CardDescription className="text-center">
            새발동 게임 통계 관리자 페이지에 로그인하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">아이디</Label>
                <Input
                  id="userId"
                  placeholder="관리자 아이디"
                  autoComplete="off"
                  {...register('userId')}
                />
                {errors.userId && (
                  <p className="text-destructive text-sm">
                    {errors.userId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="비밀번호"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {errors.root && (
                <div className="text-destructive text-sm">
                  {errors.root.message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
              >
                로그인
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            asChild
          >
            <Link href="/">메인 페이지로 돌아가기</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
