import React from 'react'
import Layout from '../layouts/Layout'

// CSS styles
import "../assets/css/pages/Conatct.css";

const Contact = () => {
  return (
    <Layout>
      {/* start  breadcrumb-section */}
      <div class="breadcrumb_section">
        <h2 class="my-auto">Contact us</h2>
      </div>
      {/* end breadcrumb-section */}

      {/* contact us section */}
      <div class="contact_us py-5">
        <div class="container">
          <div class="row">
            <div class="col col-12 col-lg-5 text_content">
              <h2 class="ps-3">
                To make requests for further information,
                <span>contact us</span> via our social channels.
              </h2>
              <p class="mt-4 ps-3">
                We just need a couple of hours! <br />No more than 2 working days
                since receiving your issue ticket.
              </p>
            </div>

            <div class="col col-12 col-lg-7 pt-1 ps-3">
              <div class="row">
                <div class="col col-12 col-md-6 col-lg-12 col-xl-6">
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Name *"
                      required
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Email *"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Phone number *"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col col-4">
                  <select
                    required
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected value="1">Personal</option>
                    <option value="2">Business</option>
                  </select>
                </div>
                <div class="col">
                  <div class="">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Business Name "
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="my-3">
                    <textarea
                      class="form-control"
                      id="describe_area"
                      placeholder="Describe what you need "
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="row">
                  <button type="button" class="ml btn btn-primary w-35 h-150">
                    Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* end contact us section */}

      {/* start details section */}
      <div class="details">
        <div class="container">
          <div class="row ">
            <div
              class="col col-xl-4 col-md-6 col-sm-12 d-flex justify-content-start justify-content-xl-center"
            >
              <div class="Card pb-5">
                <h2 class="pb-2">San Francisco</h2>
                <p class="mb-2">58 Howard Street #2 San Francisco, CA 941</p>
                <a class="pb-2" href="#">contact.sanfrancisco@mitech.com</a>
                <h5>(+68)1221 09876</h5>
              </div>
            </div>

            <div
              class="col col-xl-4 col-md-6 col-sm-12 d-flex justify-content-start justify-content-xl-center"
            >
              <div class="Card pb-5">
                <h2 class="pb-2">San Francisco</h2>
                <p class="mb-2">58 Howard Street #2 San Francisco, CA 941</p>
                <a class="pb-2" href="#">contact.sanfrancisco@mitech.com</a>
                <h5>(+68)1221 09876</h5>
              </div>
            </div>

            <div
              class="col col-xl-4 col-md-6 col-sm-12 d-flex justify-content-start justify-content-xl-center"
            >
              <div class="Card">
                <h2 class="pb-2">San Francisco</h2>
                <p class="mb-2">58 Howard Street #2 San Francisco, CA 941</p>
                <a class="pb-2" href="#">contact.sanfrancisco@mitech.com</a>
                <h5>(+68)1221 09876</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end details section */}

      {/* start support section */}
      <div class="support position-relative">
        <div class="layer position-absolute"></div>
        <div class="container position-relative">
          <div class="row justify-content-between gap-4">
            <div class="col col-12 col-lg-6 col text-center">
              <h2>
                We run all kinds of IT services that vow your <span>success</span>
              </h2>
            </div>
            <div
              class="col col-12 col-lg-5 d-flex align-items-center justify-content-center"
            >
              <button type="button" class="ml btn btn-primary w-35 h-150">
                <i class="me-1 far fa-comment-alt"></i>Send message
              </button>
              <button type="button" class="ml btn btn-secondry w-35 h-150">
                <i class="fas fa-info-circle"></i> Send message
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end support section */}
    </Layout>
  )
}

export default Contact