"use client";

import { filterComments } from "@/actions/filters/actions";
import { manageComment } from "@/actions/manage/actions";
import { CommentClass } from "@/models/main/comment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CommentManager from "../managers/commentManager";
import CommentsPager from "./commentsPager";

export default function Comments({ admin, user, issue }) {
  const [comments, setComments] = useState(null);
  const [item, setItem] = useState(null);
  const [body, setBody] = useState(null);
  let comment = new CommentClass();

  useEffect(() => {
    if (!comments) {
      const filter = {
        keyword: null,
        issueid: issue.ID,
        page: 1,
        pagesize: 7,
        sortby: "desc",
        token: admin?.Token ?? user?.Token,
      };
      async function getComments() {
        const comments = await filterComments(filter);
        setComments(comments);
      }
      getComments();
    }
  }, [admin?.Token, user?.Token, issue.ID, comments]);

  const fetchComments = async (page) => {
    const filter = {
      keyword: null,
      issueid: issue.ID,
      page: page ?? 1,
      sortby: "desc",
      pagesize: 7,
      token: admin?.Token ?? user?.Token,
    };
    const comments = await filterComments(filter);
    setComments(comments);
  };

  const onSubmit = async (e, body) => {
    e.preventDefault();
    if (body?.length > 0) {
      comment.ID = item?.ID ?? 0;
      comment.User = {
        ID: item?.User.ID ?? admin?.ID ? 0 : user?.ID,
        Company: {
          CompanyID: item?.User?.Company?.ID ?? admin?.ID ?? user?.CompanyID,
        },
      };
      comment.IssueID = issue.ID;
      comment.Body = body;
      const reqData = {
        entity: JSON.stringify(comment),
        token: admin?.Token ?? user?.Token,
      };
      let res = await manageComment(reqData);
      if (res?.ID > 0) {
        setBody("");
        setItem(null);
        fetchComments();
      } else {
        toast("Server error. Please try again.");
      }
    } else {
      toast("Please fill all necessary fields before submitting.");
    }
  };

  return (
    <div className="flex-column">
      {item ? (
        <CommentManager
          body={body}
          setBody={setBody}
          data={item}
          onSubmit={onSubmit}
        />
      ) : (
        <CommentManager
          body={body}
          setBody={setBody}
          data={null}
          onSubmit={onSubmit}
        />
      )}

      {comments ? (
        <>
          <CommentsPager data={comments} fetchComments={fetchComments} />
          {comments?.data?.map((comment) => (
            <React.Fragment key={comment.ID}>
              <div id={comment.ID} className="bg flex-column padding">
                <h5 className="weight-5">{comment.Body}</h5>
                <div className="flex-row flex-divide">
                  {admin || comment.User.ID === user.ID ? (
                    <span
                      className="function interactive text-tiny no-padding no-select"
                      onClick={() => setItem(comment)}
                    >
                      edit
                    </span>
                  ) : (
                    ""
                  )}
                  <h6
                    className="weight-5 self-end"
                    style={{ marginLeft: "auto" }}
                  >
                    by{" "}
                    {comment.User.ID > 0 ? comment.User.Name : "Administrator"}
                  </h6>
                </div>
              </div>
            </React.Fragment>
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
