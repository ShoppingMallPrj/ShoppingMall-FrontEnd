import styled from "styled-components";
import { ReactComponent as InstagramLogo } from "../assets/logo/instagram.svg";
import { ReactComponent as KaKaoTalkLogo } from "../assets/logo/kakaotalk.svg";

const Container = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 4.2rem;
`;
const Contact = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.3rem;
`;
const ContactList = styled.span`
  margin-bottom: 1.5rem;
  &:first-child {
    margin-bottom: 2.5rem;
  }
`;
const Address = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.3rem;
`;
const AddressList = styled.span`
  margin-bottom: 1.5rem;
`;
const Service = styled.div``;
const ServiceList = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;
const ServiceImg = styled.span`
  margin: 0px 5px;
  opacity: 55%;
`;

function Footer() {
  return (
    <footer>
      <Container>
        <Contact>
          <ContactList>CONTACT</ContactList>
          <ContactList>(주)오삼오: 533-57-01545</ContactList>
          <ContactList>LEE DONG HYUN</ContactList>
          <ContactList>02-512-0710</ContactList>
          <ContactList>cs@535company.com</ContactList>
        </Contact>
        <Address>
          <AddressList>535-5, amsangongwon-gil, Yongsan-gu, Seoul</AddressList>
          <AddressList>License Number:2022-남산타워-53512</AddressList>
        </Address>
        <Service>
          <ServiceList>Terms of service</ServiceList>
          <ServiceList>
            <ServiceImg>
              <InstagramLogo width="20" />
            </ServiceImg>
            <ServiceImg>
              <KaKaoTalkLogo width="20" />
            </ServiceImg>
          </ServiceList>
        </Service>
      </Container>
    </footer>
  );
}

export default Footer;
