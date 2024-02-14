"use client";

export default function CommentManager({ body, setBody, data, onSubmit }) {
  return (
    <>
      <section className="flex-row relative comment-header">
        <h3 className="bg form-header flex-row flex-center">Comments</h3>
      </section>
      <form className="flex-column w-full" onSubmit={(e) => onSubmit(e, body)}>
        <section className="flex-column comment">
          <textarea
            type="text"
            id="body"
            name="body"
            value={body?.length > 0 ? body : data?.Body ?? ""}
            placeholder="...add a comment"
            className="text-small"
            onChange={(e) => setBody(e.target.value)}
          />
        </section>
        <button type="submit" className="bg">
          Submit
        </button>
      </form>
    </>
  );
}
