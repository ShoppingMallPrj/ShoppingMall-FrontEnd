import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 11.6rem;
  right: 0;
  width: ${(props) => props.width};
  overflow-x: hidden;
  z-index: 999;
  margin-right: 6.2rem;
  transition: width 0.5s;
`;

function useOutsideSidebar(ref, hideSidebar) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.innerHTML !== "Store"
      ) {
        hideSidebar();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, hideSidebar]);
}

function OutsideSidebar({ sidebar, children, hideSidebar }) {
  const wrapperRef = useRef(null);
  useOutsideSidebar(wrapperRef, hideSidebar);

  return (
    <>
      <Container ref={wrapperRef} width={sidebar ? "10.5rem" : 0}>
        {children}
      </Container>
    </>
  );
}

export default OutsideSidebar;
