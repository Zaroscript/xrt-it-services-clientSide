import React from 'react'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import Layout from '../layouts/Layout'

import "../assets/css/pages/Home.css"

// Images
import heroImage from "../assets/images/home-services-hero-bg.webp"
import serviceImg from "../assets/images/mitech-processing-service-image-01-80x83.webp"
import companyImg1 from "../assets/images/banners/home-processing-video-intro-slider-slide-01-image-01.webp"
import companyImg2 from "../assets/images/banners/home-processing-video-intro-slider-slide-01-image-02.webp"
import companyImg3 from "../assets/images/banners/home-processing-video-intro-slider-slide-01-image-03.webp"
import companyImg4 from "../assets/images/banners/home-processing-video-intro-slider-slide-01-image-04.webp"
import companyImg5 from "../assets/images/banners/home-processing-video-intro-slider-slide-01-image-05.webp"

import serviceImg1 from "../assets/images/n-icon-1.webp"

import caseStudyImage from "../assets/images/home-services-case-study-slide-image-01.webp"

const Home = () => {
  return (
    <Layout className="mt-5">
      {/* start hero section */}
      <section id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={heroImage}
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block text-center">
              <h3>First slide label</h3>
              <p>Some representative placeholder content for the first slide.</p>
              <button type="button" className="btn btn-primary">Primary</button>
              <button type="button" className="btn btn-secondary">Secondary</button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={heroImage}
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Second slide label</h3>
              <p>Some representative placeholder content for the second slide.</p>
              <button type="button" className="btn btn-primary">Primary</button>
              <button type="button" className="btn btn-secondary">Secondary</button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={heroImage}
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Third slide label</h3>
              <p>Some representative placeholder content for the third slide.</p>
              <button type="button" className="btn btn-primary">Primary</button>
              <button type="button" className="btn btn-secondary">Secondary</button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </section>
      {/* end hero section */}

      {/* start services section */}
      <section className="services">
        <div className="container">
          <div className="row">
            <div className="col col-12 col-md-6 col-lg-4 col-xl-3 ">
              <div className="card">
                <div className="resize_img mx-auto m-md-0">
                  <img
                    src={serviceImg}
                    className="card-img-top ms-md-4"
                    alt="..."
                  />
                </div>
                <div className="card-body text-center text-md-start">
                  <h5 className="card-title">Firewall advancment</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                    quo odio ab sed velit excepturi atque fugiat iure, nisi minima.
                  </p>
                </div>
              </div>
            </div>

            <div className="col col-12 col-md-6 col-lg-4 col-xl-3 ">
              <div className="card">
                <div className="resize_img mx-auto m-md-0">
                  <img
                    src={serviceImg}
                    className="card-img-top ms-md-4"
                    alt="..."
                  />
                </div>
                <div className="card-body text-center text-md-start">
                  <h5 className="card-title">Firewall advancment</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                    quo odio ab sed velit excepturi atque fugiat iure, nisi minima.
                  </p>
                </div>
              </div>
            </div>

            <div className="col col-12 col-md-6 col-lg-4 col-xl-3 ">
              <div className="card">
                <div className="resize_img mx-auto m-md-0">
                  <img
                    src={serviceImg}
                    className="card-img-top ms-md-4"
                    alt="..."
                  />
                </div>
                <div className="card-body text-center text-md-start">
                  <h5 className="card-title">Firewall advancment</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                    quo odio ab sed velit excepturi atque fugiat iure, nisi minima.
                  </p>
                </div>
              </div>
            </div>

            <div className="col col-12 col-md-6 col-lg-4 col-xl-3 ">
              <div className="card">
                <div className="resize_img mx-auto m-md-0">
                  <img
                    src={serviceImg}
                    className="card-img-top ms-md-4"
                    alt="..."
                  />
                </div>
                <div className="card-body text-center text-md-start">
                  <h5 className="card-title">Firewall advancment</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                    quo odio ab sed velit excepturi atque fugiat iure, nisi minima.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end services section */}

      {/* start our company section */}
      <section className="our_company">
        <div className="container">
          <div className="row align-items-lg-end">
            {/* about */}
            <div className="col col-12 col-lg-6">
              <h3 className="fs-6">OUR COMPANY</h3>
              <h2 className="fs-3 ">We've been triumphing all these <span>38 years.</span><br /> Sacrifices are made up with success</h2>
              <p>XRT takes into consideration every little detail to make sure the system run smoothly and responsively . XRT employs a new technique called Minified Technology for securing customers' database & building up highly confidential firewalls.</p>
              <button type="button" className="btn btn-primary w-35 h-150 ">
                Find Out More
              </button>
            </div>

            {/* image and video */}
            <div className="col col-12 col-lg-6">
              <div className="video_and_image">
                <div className="video position-relative">
                  <a href="https://youtu.be/9No-FiEInLA?si=2z829SYXtfU3uqiB" target="_blank">
                    <img src={companyImg1} className="w-100 main_img" alt="" />
                  </a>

                  <img src={companyImg2} className="img_1" alt="" />
                  <img src={companyImg3} className="img_2" alt="" />
                  <img src={companyImg4} className="img_3" alt="" />
                  <img src={companyImg5} className="img_4" alt="" />

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* start managed it section */}
      <section className="managed-section">
        <div className="main-title">
          <h4>WHY CHOOSE XRT Tech</h4>
          <h2>Managed IT services customized for <span>your industry</span></h2>
        </div>
        <div className="container">
          <div className="row ">
            <div className="col col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <div className="card">
                <img
                  src={serviceImg1}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Advanced AI</h5>
                  <p className="card-text">
                    Turn our AI research into your organization’s value with tools
                    like Cloud AutoML, Cloud Natural Language…
                  </p>
                  <div className="card-button">
                    <a href="#" className="btn btn-light"
                    >Discover now<i className="fas fa-arrow-right px-2"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <div className="card">
                <img
                  src={serviceImg1}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Advanced AI</h5>
                  <p className="card-text">
                    Turn our AI research into your organization’s value with tools
                    like Cloud AutoML, Cloud Natural Language…
                  </p>
                  <div className="card-button">
                    <a href="#" className="btn btn-light"
                    >Discover now<i className="fas fa-arrow-right px-2"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <div className="card">
                <img
                  src={serviceImg1}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Advanced AI</h5>
                  <p className="card-text">
                    Turn our AI research into your organization’s value with tools
                    like Cloud AutoML, Cloud Natural Language…
                  </p>
                  <div className="card-button">
                    <a href="#" className="btn btn-light"
                    >Discover now<i className="fas fa-arrow-right px-2"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end managed it section */}

      {/* <!-- start services --> */}
      <section className="service">
        <div className="container">
          <div className="row align-items-center">
            <div className="col col-lg-8  col-12 mb-5">
              <h3>
                We run all kinds of IT services that vow your <span>success</span>
              </h3>
            </div>
            <div className="col col-lg-4  col-12 service-content">
              <div className="row">
                <div className="col col-lg-6 offset-lg-0 offset-md-2 col-md-4">
                  <button type="button" className="btn lets-talk">
                    <i className="far fa-comment-alt"></i>
                    <span> Let's talk</span>
                  </button>
                </div>
                <div className="col col-lg-6 offset-lg-0  col-md-4">
                  <button type="button" className="btn Get-info">
                    <i className="fas fa-info-circle"></i>
                    <span> Get info</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end services --> */}

      {/* <!-- start studies--> */}
      <section className="studies">
        <div className="container">
          <div className="row text-center ">
            <div className="col col-12 col-7 main-title">
              <h4>CASE STUDIES</h4>
              <h2>Proud projects that <span> make us stand out</span></h2>
            </div>
          </div>
          <div className="row studies-content">
            <div className="col my-5 col-12 col-lg-7">
              <h3>
                Aqua Technology Case
                Studies
              </h3>
              <span className="cyber">Cyber Security</span>
              <p className='mt-2'>
                ARM Holdings is the world's leading semiconductor Intellectual
                Property (IP) supplier. A semiconductor is the electronic
                controller at the heart of many devices that we use every day.
              </p>
            </div>
            <div className="col col-lg-5 col-12 my-2">
              <img
                src={caseStudyImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end studies--> */}

    </Layout>
  )
}

export default Home;