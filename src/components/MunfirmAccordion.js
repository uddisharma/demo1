import { Accordion } from "react-bootstrap";

const MunfirmAccordion = ({ title, event }) => {
  return (
    <div className="card">
      <Accordion.Toggle as={"h5"} className="card-header" eventKey={event}>
        {title}
        <i className="fas fa-chevron-right" />
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={event} className="content">
        <div className="card-body">
          <p>
            On the other hand, we denounce with righteous indignation and
            dislike men who are so beguiled and demoralized by the charms of
            pleasure of the moment, so blinded by desire, that they cannot
            foresee the pain and trouble that are bound to ensue; and equal
            blame belongs to those who fail in their duty through weakness of
            will, which is the same as saying through shrinking from toil and
            pain cases are perfectly simple
          </p>
        </div>
      </Accordion.Collapse>
    </div>
  );
};
export default MunfirmAccordion;
