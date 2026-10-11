import React, { useContext } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';

const Services = () => {
  const { services } = useContext(PortfolioContext);

  return (
    <section id="services">
      <Container>
        <Title title="How I Work With Experts & Creators" />
        <Row className="services-wrapper">
          {services.map((service, index) => {
            const { title, info, id } = service;

            return (
              <Col key={id} md={4} sm={12}>
                <Fade bottom duration={1000} delay={400 + index * 200} distance="30px">
                  <div className="services-wrapper__card">
                    <span className="services-wrapper__step">{`0${index + 1}`}</span>
                    <h3 className="services-wrapper__title">{title}</h3>
                    <p className="services-wrapper__info">{info}</p>
                  </div>
                </Fade>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
