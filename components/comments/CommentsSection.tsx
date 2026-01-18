"use client"

import { useState } from "react"
import { MessageSquare, Send, User } from "lucide-react"

interface Comment {
  id: string
  content: string
  createdAt: Date
  author: {
    name: string
    image?: string
  }
}

interface CommentsSectionProps {
  articleId: string
  comments: Comment[]
}

export default function CommentsSection({ 
  articleId, 
  comments = [] 
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    // TODO: Implement comment submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setNewComment("")
    setIsSubmitting(false)
  }

  return (
    <div id="comments" className="mt-12 pt-8 border-t border-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="text-[#5eead4]" />
        <h3 className="text-2xl font-bold text-white">التعليقات ({comments.length})</h3>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="اكتب تعليقك هنا..."
            className="input-field w-full h-32"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center gap-2"
        >
          <Send size={18} />
          {isSubmitting ? "جاري الإرسال..." : "إرسال التعليق"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="card">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5eead4] to-[#60a5fa] flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-white">{comment.author.name}</h4>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('ar-SA', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">لا توجد تعليقات بعد. كن أول من يعلق!</p>
          </div>
        )}
      </div>
    </div>
  )
}
