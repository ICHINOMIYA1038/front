import React, { useEffect } from "react";
import { useState } from "react";
import { Chip } from "@mui/material";

interface Post {
  post_id: number;
  content: string;
  user_id: string;
  title: string;
  synopsis: string;
  catchphrase: string;
  number_of_men: string;
  number_of_women: string;
  total_number_of_people: string;
  playtime: any;
  image_url: string;
  file_url: string;
  user_image_url: string;
  name: string;
  tags: string[];
}

function ChangeNameforPlaytime(option: Number) {
  if (option === 0) {
    return "30分未満";
  } else if (option === 1) {
    return "30分以上〜60分未満";
  } else if (option === 2) {
    return "60分以上〜90分未満";
  } else if (option === 3) {
    return "90分以上〜120分未満";
  } else if (option === 4) {
    return "120分以上";
  }
}

function PostCardDetail() {
  const [isClicked, setIsClicked] = useState(false);
  const [post, setPost] = useState<Post | null>();

  return (
    <div className={`PostCard ${isClicked ? "clicked" : ""} PopUpContainer`}>
      <div className="PostCardHeadar">
        <div className="PostCardHeaderLeft">
          <div className="PostCardUserProfile">
            <img
              src={post?.user_image_url}
              alt="Avatar"
              style={{ width: "80px", height: "80px" }}
            />
            <p>{post?.name}</p>
          </div>
          <div className="post?CardTitle">
            <p>{post?.title}</p>
          </div>
          <div className="post?CardDescription">
            <p>{post?.catchphrase}</p>
          </div>
        </div>
        <div className="post?CardHeaderRight">
          <div className="tagsContainer">
            {post?.tags &&
              post?.tags
                .slice(0, 3)
                .map((elem: any) => (
                  <Chip
                    key={elem}
                    label={elem.name}
                    clickable
                    style={{ margin: "0.5rem" }}
                  />
                ))}
            {post?.tags && post?.tags.length > 3 && (
              <Chip
                key="ellipsis"
                label="..."
                clickable
                style={{ margin: "0.5rem" }}
              />
            )}
          </div>
          <div className="PlotDetail">
            <p className="Playtime">
              上演時間:{" "}
              <span className="Underline">
                {ChangeNameforPlaytime(post?.playtime)}
              </span>
            </p>
            <div className="PersonCount">
              <p>
                男: <span className="Emphasize">{post?.number_of_men}</span>
              </p>
              <p>
                女: <span className="Emphasize">{post?.number_of_women}</span>
              </p>
              <p>
                総人数:{" "}
                <span className="Emphasize">
                  {post?.total_number_of_people}
                </span>
              </p>
            </div>
          </div>
          <img
            src={post?.image_url}
            alt="Avatar"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
      </div>
      <div className="post?CardFooter">
        <embed src={post?.file_url} className="embedPDF" />
      </div>

      <div className="SynopsisContainer">
        <p>あらすじ</p>
        <p>{post?.synopsis}</p>
      </div>

      <div className="CopyRightContainer">
        <p>著作権: 無料</p>
        <p>
          脚色や改変は適宜行ってください。 特に制限はありません。
          是非とも感想などでもご連絡いただけると嬉しいです。
        </p>
      </div>
    </div>
  );
}

export default PostCardDetail;
