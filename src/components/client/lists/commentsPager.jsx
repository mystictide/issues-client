"use client";

export default function CommentsPager({ data, fetchComments }) {
  return (
    <>
      {data.filter.pager.TotalPages > 1 ? (
        <div className="pager w-full flex-row flex-divide">
          <h6>
            found {data.totalItems} items, currently on page{" "}
            {data.filter.pager.CurrentPage}
          </h6>
          <ul className="flex-row">
            {data.filter.pager.CurrentPage > 1 ? (
              <li>
                <button className="bg " onClick={() => fetchComments(1)}>
                  {"<<"}
                </button>
              </li>
            ) : (
              ""
            )}
            {data.filter.pager.CurrentPage > 1 ? (
              <li>
                <button
                  className="bg"
                  onClick={() =>
                    fetchComments(data.filter.pager.CurrentPage - 1)
                  }
                >
                  {"<"}
                </button>
              </li>
            ) : (
              ""
            )}
            {data.filter.pager.CurrentPage === data.filter.pager.TotalPages ? (
              ""
            ) : (
              <li>
                <button
                  className="bg"
                  onClick={() =>
                    fetchComments(data.filter.pager.CurrentPage + 1)
                  }
                >
                  {">"}
                </button>
              </li>
            )}
            {data.filter.pager.CurrentPage === data.filter.pager.TotalPages ? (
              ""
            ) : (
              <li>
                <button
                  className="bg"
                  onClick={() => fetchComments(data.filter.pager.TotalPages)}
                >
                  {">>"}
                </button>
              </li>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
