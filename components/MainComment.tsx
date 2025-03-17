"use client";

import { IComment } from "@/types/ICommentsReqResponse";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SubComment from "./SubComment";

interface IMainComment {
    comment: IComment;
}

const MainComment: React.FC<IMainComment> = ({ comment }) => {
    const {
        author_avatar,
        author_nickname,
        id,
        parent_id,
        sub_comments,
        task_id,
        text,
    } = comment;

    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState("");
    const replyInputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                replyInputRef.current &&
                !replyInputRef.current.contains(event.target as Node)
            ) {
                setShowReplyInput(false);
            }
        };

        if (showReplyInput) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showReplyInput]);

    const handleReply = () => {
        console.log("Reply submitted:", replyText, "to comment ID:", id);
        setReplyText("");
        setShowReplyInput(false);
    };

    return (
        <div className="flex gap-3">
            <img
                src={author_avatar}
                alt={author_nickname}
                width={38}
                height={38}
                className="size-[38px] rounded-full bg-center object-cover"
            />
            <div className="">
                <p className="text-[18px] text-grey-shades-headlines font-medium">
                    {author_nickname}
                </p>
                <p className="text-grey-shades-subheadlines font-light">
                    {text}
                </p>
                <div
                    className="flex items-center gap-[6px] mt-[10px]"
                    onClick={() => setShowReplyInput(!showReplyInput)}
                >
                    <Image
                        src={"/replay-icon.svg"}
                        alt="replay-icon"
                        width={16}
                        height={16}
                    />
                    <p className="text-xs text-purple-accent hover:text-[#B588F4]">
                        უპასუხე
                    </p>
                </div>
                {showReplyInput && (
                    <div
                        ref={replyInputRef}
                        className="mt-3 w-full rounded-[10px] px-3 pt-[10px] pb-[10px] bg-white border-[0.3px] border-grey-shades-greyish"
                    >
                        <textarea
                            placeholder="დაწერე პასუხი"
                            className="outline-0 w-full p-[10px] resize-none break-words"
                            rows={2}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleReply}
                                className="bg-purple-accent text-white rounded-[20px] py-2 px-4 text-sm"
                            >
                                დააკომენტარე
                            </button>
                        </div>
                    </div>
                )}
                {sub_comments && sub_comments.length > 0 && (
                    <div className="sub-comments mt-2">
                        {sub_comments.map((subComment) => (
                            <SubComment
                                key={subComment.id}
                                subComment={subComment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainComment;
