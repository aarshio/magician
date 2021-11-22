import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import * as timeago from "timeago.js";

import "./images.css";

const PostsView = ({ posts }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!posts || posts.length === 0 ? (
        <div>No posts to show </div>
      ) : (
        <>
          {posts.map((post, index) => (
            <div key={post._id} style={{ marginBottom: "1rem" }}>
              <Card
                style={{ width: "100%" }}
                sx={{ width: "100%" }}
                title={post._id}
              >
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    onClick={() => setOpen(!open)}
                  >
                    {timeago.format(new Date(post.timestamp))}
                  </Typography>

                  <Typography variant="subtitle2" component="p">
                    {open ? post._id : null}
                  </Typography>

                  <div
                    style={{ "max-height": "900px", overflow: "auto" }}
                    dangerouslySetInnerHTML={{ __html: post.data }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PostsView;
