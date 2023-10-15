import styles from "./Inner.module.css";

const Inner = ({ cars }) => {
  return (
    <div className={styles.inner}>
      <div className={`${styles.wrap} d-flex flex-column w-100 gap-3`}>
        <div className="mt-3 px-3 py-2">
          <p className="text-muted fw-bold text-uppercase">
            {cars ? "Cars" : "Dashboard"}
          </p>
        </div>
        <div
          className="mt-3 px-3 py-2"
          style={{ backgroundColor : '#CFD4ED'}}
        >
          <p className="fw-bold ">{cars ? "List Car" : "Dashboard"}</p>
        </div>
      </div>
    </div>
  );
};

export default Inner;
