"use server";

export default async function Pager({ data, url }) {
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
                <a className="bg padding" href={`${url}?page=1`}>{"<<"}</a>
              </li>
            ) : (
              ""
            )}
            {data.filter.pager.CurrentPage > 1 ? (
              <li>
                <a className="bg padding" href={`${url}?page=${data.filter.pager.CurrentPage - 1}`}>
                  Previous Page
                </a>
              </li>
            ) : (
              ""
            )}
            {data.filter.pager.CurrentPage === data.filter.pager.TotalPages ? (
              ""
            ) : (
              <li>
                <a className="bg padding" href={`${url}?page=${data.filter.pager.CurrentPage + 1}`}>
                  Next Page
                </a>
              </li>
            )}
            {data.filter.pager.CurrentPage === data.filter.pager.TotalPages ? (
              ""
            ) : (
              <li>
                <a className="bg padding" href={`${url}?page=${data.filter.pager.TotalPages}`}>
                  {">>"}
                </a>
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
