import { ISubComment } from "@/types/ICommentsReqResponse";
import React from "react";

interface ISubCommentProps {
    subComment: ISubComment;
}

const SubComment: React.FC<ISubCommentProps> = ({ subComment }) => {
    const { author_avatar, author_nickname, text } = subComment;

    return (
        <div className="flex gap-3 ml-10 mt-4">
            <img
                src={author_avatar}
                alt={author_nickname}
                width={32}
                height={32}
                className="size-[32px] rounded-full bg-center object-cover"
            />
            <div>
                <p className="text-[16px] text-grey-shades-headlines font-medium">
                    {author_nickname}
                </p>
                <p className="text-grey-shades-subheadlines font-light">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default SubComment;
