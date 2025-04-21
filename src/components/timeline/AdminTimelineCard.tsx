'use client'

import { Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Timeline } from '@/types/timeline'

interface IAdminTimelineCardProps {
  data: Timeline
}

function AdminTimelineCard({ data }: IAdminTimelineCardProps) {
  return (
    <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
      <CardContent className="px-6">
        <div className="flex items-start justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold">{data.title}</h4>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link
                    href={`/admin/timelines/${data.timelineId}`}
                    prefetch={false}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    수정
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  // onClick={() => handleDeleteGame(game.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  삭제
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {data.description}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-muted-foreground mb-2 text-sm">참여 스트리머</p>

          <div className="flex flex-wrap gap-2">
            {data.participations.map((participation) => (
              <div
                key={participation.participationId}
                className="hover:border-primary flex cursor-pointer items-center gap-1.5 rounded-full border px-2 py-1"
              >
                <Image
                  className="rounded-full"
                  src={participation.streamer.profileImageUrl}
                  width={24}
                  height={24}
                  alt={participation.streamer.nickname}
                />
                <span className="text-sm">
                  {participation.streamer.nickname}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminTimelineCard
