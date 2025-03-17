"use client";

import React from "react";
import CustomButton from "./CustomButton";
import { IComment } from "@/types/ICommentsReqResponse";
import MainComment from "./MainComment";

interface ICommentSection {
    comments: IComment[];
}

const CommentsSection: React.FC<ICommentSection> = ({ comments }) => {
    const handleClick = () => {
        console.log("clicked");
    };

    const total_comments = comments.length;

    return (
        <section className="w-[741px] max-w-[741px] rounded-[10px] border-[0.3px] border-[#DDD2FF] bg-[#F8F3FEA6] py-10 px-[45px]">
            <div className="w-full min-h-[135px] rounded-[10px] px-5 pt-[18px] pb-[15px] bg-white border-[0.3px] border-grey-shades-greyish">
                <textarea
                    placeholder="დაწერე კომენტარი"
                    className="outline-0 w-full p-[10px] resize-none break-words"
                    rows={3}
                />
                <div className="flex justify-end">
                    <CustomButton
                        title="დააკომენტარე"
                        onClick={handleClick}
                        otherStyles="bg-purple-accent text-white rounded-[20px]"
                        fill={true}
                    />
                </div>
            </div>

            <div className="mt-[66px]">
                <div className="flex items-center gap-2 mb-10">
                    <h1>კომენტარები</h1>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-accent">
                        <p className="text-white font-medium text-sm text-center">
                            {total_comments}
                        </p>
                    </div>
                </div>

                {total_comments > 0 && (
                    <div className="space-y-[38px]">
                        {comments.map((comment) => (
                            <MainComment key={comment.id} comment={comment} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CommentsSection;
