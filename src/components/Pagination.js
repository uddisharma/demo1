import { Fragment, useEffect, useState } from "react";
import { getPagination, pagination } from "../utils";
const Pagination = ({ paginationCls, defaultSort }) => {
  let sort = defaultSort ? defaultSort : 2;
  const [active, setActive] = useState(1);
  const [state, setstate] = useState([]);
  useEffect(() => {
    pagination(paginationCls, sort, active);
    let list = document.querySelectorAll(paginationCls);
    setstate(getPagination(list.length, sort));
  }, [active]);
  return (
    <Fragment>
      <li className={`page-item ${active == 1 ? "disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActive(active === 1 ? 1 : active - 1);
          }}
        >
          <i className="fas fa-chevron-left" />
        </a>
      </li>
      {state &&
        state.map((s, i) => (
          <li key={i} className={`page-item ${active === s ? "active" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActive(s);
              }}
            >
              {s}
            </a>
          </li>
        ))}
      <li className={`page-item ${active == state.length ? "disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActive(active === state.length ? state.length : active + 1);
          }}
        >
          <i className="fas fa-chevron-right" />
        </a>
      </li>
    </Fragment>
  );
};
export default Pagination;
