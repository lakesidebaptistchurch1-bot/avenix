import { Icon } from "@/components/Icon";

export default function MinistrySinglePage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Prayer Ministry
                </h1>
                <nav className="wow fadeInUp" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-ministry-single">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="ministry-single-content">
                <div className="ministry-single-slider">
                  <div className="swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="ministry-slider-image">
                          <figure className="image-anime">
                            <img src="/images/ministries-img-1.jpg" alt="" />
                          </figure>
                        </div>
                      </div>

                      <div className="swiper-slide">
                        <div className="ministry-slider-image">
                          <figure className="image-anime">
                            <img src="/images/ministries-img-2.jpg" alt="" />
                          </figure>
                        </div>
                      </div>

                      <div className="swiper-slide">
                        <div className="ministry-slider-image">
                          <figure className="image-anime">
                            <img src="/images/ministries-img-3.jpg" alt="" />
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-pagination" />
                  </div>
                </div>

                <div className="ministry-entry">
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Welcome to Children&apos;s Ministry!
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    Welcome to our Children&apos;s Ministry, where we nurture the spiritual growth of our youngest members
                    in a fun and engaging environment. Our programs are designed to teach children about the love of
                    Jesus through interactive Bible stories, worship, crafts, and games.
                  </p>
                  <p className="wow fadeInUp" data-wow-delay="0.4s">
                    Kids learn about Jesus through interactive Bible stories, worship, crafts, and games. Our dedicated
                    volunteers provide a safe space for children to grow in faith, make friends, and build a foundation
                    in Christian values.
                  </p>
                  <p className="wow fadeInUp" data-wow-delay="0.6s">
                    Whether it&apos;s through Sunday School, Vacation Bible School, or special events throughout the year,
                    our goal is to support and inspire each child to grow closer to God and to understand His immense
                    love for them.
                  </p>

                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Children&apos;s Ministry Features
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay="0.8s">
                    Our Children&apos;s Ministry offers interactive Bible stories, spirited worship, creative crafts, and
                    fun games in a safe, faith-building environment.
                  </p>
                  <ul className="wow fadeInUp" data-wow-delay="1s">
                    <li>Interactive Stories</li>
                    <li>Spirited Worship</li>
                    <li>Creative Crafts</li>
                    <li>Exciting Games</li>
                    <li>Dedicated Volunters</li>
                    <li>Safe Environment</li>
                    <li>Faith Development</li>
                    <li>Friendship Building</li>
                  </ul>

                  <div className="ministry-entry-image">
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="ministry-entry-img-1">
                          <figure className="image-anime reveal">
                            <img src="/images/ministry-entry-img-1.jpg" alt="" />
                          </figure>
                        </div>
                      </div>

                      <div className="col-md-6 col-12">
                        <div className="ministry-entry-img-2">
                          <figure className="image-anime reveal">
                            <img src="/images/ministry-entry-img-2.jpg" alt="" />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ministry-single-faqs">
                  <div className="section-title">
                    <h2 className="text-anime-style-2" data-cursor="-opaque">
                      Our Core Value
                    </h2>
                  </div>

                  <div className="core-value-faqs-accordion" id="accordion">
                    <div className="accordion-item wow fadeInUp">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Why is faith a core value?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordion"
                      >
                        <div className="accordion-body">
                          <p>
                            We demonstrate love through compassionate ministry, supportive relationships, and inclusive
                            community practices.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item wow fadeInUp" data-wow-delay="0.25s">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          How does the church demonstrate love?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordion"
                      >
                        <div className="accordion-body">
                          <p>
                            We demonstrate love through compassionate ministry, supportive relationships, and inclusive
                            community practices.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item wow fadeInUp" data-wow-delay="0.5s">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          How is community fostered within the church?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordion"
                      >
                        <div className="accordion-body">
                          <p>
                            We demonstrate love through compassionate ministry, supportive relationships, and inclusive
                            community practices.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item wow fadeInUp" data-wow-delay="0.75s">
                      <h2 className="accordion-header" id="headingfour">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapsefour"
                          aria-expanded="false"
                          aria-controls="collapsefour"
                        >
                          What is the importance of spiritual growth?
                        </button>
                      </h2>
                      <div
                        id="collapsefour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingfour"
                        data-bs-parent="#accordion"
                      >
                        <div className="accordion-body">
                          <p>
                            We demonstrate love through compassionate ministry, supportive relationships, and inclusive
                            community practices.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item wow fadeInUp" data-wow-delay="1s">
                      <h2 className="accordion-header" id="headingfive">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapsefive"
                          aria-expanded="false"
                          aria-controls="collapsefive"
                        >
                          How do these values shape church activities?
                        </button>
                      </h2>
                      <div
                        id="collapsefive"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingfive"
                        data-bs-parent="#accordion"
                      >
                        <div className="accordion-body">
                          <p>
                            We demonstrate love through compassionate ministry, supportive relationships, and inclusive
                            community practices.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="ministry-single-sidebar wow fadeInUp" data-wow-delay="0.25s">
                <div className="ministry-single-box">
                  <div className="ministry-single-info">
                    <div className="icon-box">
                      <Icon name="clock" />
                    </div>
                    <div className="ministry-single-info-content">
                      <h3>meeting times</h3>
                    </div>
                  </div>
                  <div className="ministry-single-info-list">
                    <ul>
                      <li>Tuesdays, 12:30pm - 3:00pm</li>
                      <li>Thursdays, 9:00am - 11:00am</li>
                    </ul>
                  </div>
                </div>

                <div className="ministry-single-box">
                  <div className="ministry-single-info">
                    <div className="icon-box">
                      <Icon name="calendar-days" />
                    </div>
                    <div className="ministry-single-info-content">
                      <h3>schedule</h3>
                    </div>
                  </div>
                  <div className="ministry-single-info-list">
                    <ul>
                      <li>10:00 AM - Welcome kids and playtime</li>
                      <li>10:20 AM - Worship</li>
                      <li>10:35 AM - Large group lesson</li>
                      <li>11:00 AM - Age group split off</li>
                      <li>11:45 AM - Closing time</li>
                    </ul>
                  </div>
                </div>

                <div className="ministry-single-box">
                  <div className="ministry-single-info">
                    <div className="icon-box">
                      <Icon name="location" />
                    </div>
                    <div className="ministry-single-info-content">
                      <h3>location</h3>
                    </div>
                  </div>
                  <div className="ministry-single-info-list">
                    <ul>
                      <li>Lorem ipsum is a placeholder text commonly used to demonstrate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

