import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 42rem;
  height: ${(props) => (props.searchbar ? "1.8rem" : 0)};
  position: absolute;
  top: 5rem;
  right: 0;
  overflow-y: hidden;
  border-bottom: ${(props) => (props.searchbar ? "1px solid black" : "none")};
  transition: height 0.5s;
`;

function useOutsideSearchbar(ref, hideSearchbar) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.innerHTML !== "Search"
      ) {
        hideSearchbar();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, hideSearchbar]);
}

function OutsideSearchbar({ searchbar, children, hideSearchbar }) {
  const wrapperRef = useRef(null);
  useOutsideSearchbar(wrapperRef, hideSearchbar);
  return (
    <Container ref={wrapperRef} searchbar={searchbar}>
      {children}
    </Container>
  );
}

export default OutsideSearchbar;
