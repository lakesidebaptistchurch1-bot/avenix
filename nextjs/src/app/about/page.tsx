import { Icon } from "@/components/Icon";

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  <span>About</span> Us
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      About Us
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us page-about-us">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-image">
                <div className="about-img-1">
                  <figure className="image-anime reveal">
                    <img src="/images/fade.gif" alt="" />
                  </figure>
                </div>

                <div className="about-img-2">
                  <figure className="image-anime reveal">
                    <img src="/images/background.jpg" alt="" />
                  </figure>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-content">
                <div className="section-title">
                  <h3 className="wow fadeInUp">about us</h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Faith, hope, and love in <span>action every day</span>
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay="0.25s">
                    We are a vibrant community of believers dedicated to worship, fellowship, and service. Our mission
                    is to share God&apos;s love, grow in faith, and make a positive impact in the world through
                    compassionate outreach and meaningful connections.
                  </p>
                  <p className="wow fadeInUp" data-wow-delay="0.5s">
                    Our church is a welcoming place where everyone can find support, inspiration, and a sense of
                    belonging. Together, we strive to live out our faith and make a difference.
                  </p>
                </div>

                <div className="about-content-body">
                  <div className="about-list-item wow fadeInUp">
                    <div className="icon-box">
                      <img src="/images/icon-about-list-1.svg" alt="" />
                    </div>
                    <div className="about-list-item-content">
                      <h3>share god&apos;s love</h3>
                    </div>
                  </div>

                  <div className="about-list-item wow fadeInUp" data-wow-delay="0.25s">
                    <div className="icon-box">
                      <img src="/images/icon-about-list-2.svg" alt="" />
                    </div>
                    <div className="about-list-item-content">
                      <h3>foster spiritual growth</h3>
                    </div>
                  </div>

                  <div className="about-list-item wow fadeInUp" data-wow-delay="0.5s">
                    <div className="icon-box">
                      <img src="/images/icon-about-list-3.svg" alt="" />
                    </div>
                    <div className="about-list-item-content">
                      <h3>serve our community</h3>
                    </div>
                  </div>

                  <div className="about-list-item wow fadeInUp" data-wow-delay="0.75s">
                    <div className="icon-box">
                      <img src="/images/icon-about-list-4.svg" alt="" />
                    </div>
                    <div className="about-list-item-content">
                      <h3>build strong relationships</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Mission Section */}
      <div className="vision-mission">
        <div className="container">
          <div className="row section-row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Building Faithful Community Through Love, Service, <span>Worship, and Fellowship.</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="vision-mission-nav wow fadeInUp" data-wow-delay="0.25s">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#vision"
                      type="button"
                      role="tab"
                      aria-selected="true"
                    >
                      our vision
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#mission"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      our mission
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#approach"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      our approach
                    </button>
                  </li>
                </ul>
              </div>

              <div className="vision-mission-box tab-content" id="myTabContent">
                <div className="our-vision-item tab-pane fade show active" id="vision" role="tabpanel">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="vision-mission-content">
                        <div className="section-title">
                          <h2 className="text-anime-style-2" data-cursor="-opaque">
                            Our Vision to Serve, <span>Love, and Grow</span>
                          </h2>
                        </div>
                        <div className="vision-mission-body">
                          <h3 className="wow fadeInUp" data-wow-delay="0.25s">
                            Our vision is to share God&apos;s love, foster spiritual growth, and serve our community with
                            compassion and purpose.
                          </h3>
                          <p className="wow fadeInUp" data-wow-delay="0.5s">
                            Our vision is to serve our community with compassion, love unconditionally, and foster
                            spiritual growth. Through dedicated service, heartfelt worship, and supportive fellowship,
                            we strive to create a nurturing environment where individuals can deepen their faith,
                            connect with others, and make a positive impact.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="vision-mission-image">
                        <figure className="image-anime reveal">
                          <img src="/images/background.jpg" alt="" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="our-vision-item tab-pane fade" id="mission" role="tabpanel">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="vision-mission-content">
                        <div className="section-title">
                          <h2 className="text-anime-style-2" data-cursor="-opaque">
                            Our Vision to Serve, <span>Love, and Grow</span>
                          </h2>
                        </div>
                        <div className="vision-mission-body">
                          <h3>
                            Our mission is to share God&apos;s love, foster spiritual growth, and serve our community with
                            compassion and purpose.
                          </h3>
                          <p>
                            Our vision is to serve our community with compassion, love unconditionally, and foster
                            spiritual growth. Through dedicated service, heartfelt worship, and supportive fellowship,
                            we strive to create a nurturing environment where individuals can deepen their faith,
                            connect with others, and make a positive impact.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="vision-mission-image">
                        <figure className="image-anime reveal">
                          <img src="/images/our-mission-img.jpg" alt="" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="our-mission-item tab-pane fade" id="approach" role="tabpanel">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="vision-mission-content">
                        <div className="section-title">
                          <h2 className="text-anime-style-2" data-cursor="-opaque">
                            Our Vision to Serve, <span>Love, and Grow</span>
                          </h2>
                        </div>
                        <div className="vision-mission-body">
                          <h3>
                            Our approach is to share God&apos;s love, foster spiritual growth, and serve our community with
                            compassion and purpose.
                          </h3>
                          <p>
                            Our approach is to serve our community with compassion, love unconditionally, and foster
                            spiritual growth. Through dedicated service, heartfelt worship, and supportive fellowship,
                            we strive to create a nurturing environment where individuals can deepen their faith,
                            connect with others, and make a positive impact.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="vision-mission-image">
                        <figure className="image-anime reveal">
                          <img src="/images/our-approach-img.jpg" alt="" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Section */}
      <div className="our-counter">
        <div className="container">
          <div className="row counter-box">
            <div className="col-lg-3 col-md-6">
              <div className="counter-item">
                <div className="counter-title">
                  <h2>
                    <span className="counter">350</span>+
                  </h2>
                </div>
                <div className="counter-content">
                  <h3>oldest member</h3>
                  <p>Our oldest member is Mary Thompson, who is 95 years old and has been attending since 1945.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="counter-item">
                <div className="counter-title">
                  <h2>
                    <span className="counter">98</span>+
                  </h2>
                </div>
                <div className="counter-content">
                  <h3>youth retreats</h3>
                  <p>Our oldest member is Mary Thompson, who is 95 years old and has been attending since 1945.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="counter-item">
                <div className="counter-title">
                  <h2>
                    <span className="counter">148</span>+
                  </h2>
                </div>
                <div className="counter-content">
                  <h3>tech workshops</h3>
                  <p>Our oldest member is Mary Thompson, who is 95 years old and has been attending since 1945.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="counter-item">
                <div className="counter-title">
                  <h2>
                    <span className="counter">58</span>+
                  </h2>
                </div>
                <div className="counter-content">
                  <h3>christmas concert</h3>
                  <p>Our oldest member is Mary Thompson, who is 95 years old and has been attending since 1945.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="what-we-do">
        <div className="container">
          <div className="row section-row">
            <div className="col-lg-12">
              <div className="section-title">
                <h3 className="wow fadeInUp">what we do</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Living Our <span>Faith Together</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="what-we-item wow fadeInUp">
                <div className="icon-box">
                  <img src="/images/icon-what-we-1.svg" alt="" />
                </div>
                <div className="what-we-content">
                  <h3>worship services</h3>
                  <p>
                    Experience spiritual growth and meaningful connection through heartfelt worship and fellowship.
                    Everyone is welcome to join us
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="what-we-item wow fadeInUp" data-wow-delay="0.25s">
                <div className="icon-box">
                  <img src="/images/icon-what-we-2.svg" alt="" />
                </div>
                <div className="what-we-content">
                  <h3>community outreach</h3>
                  <p>
                    Experience spiritual growth and meaningful connection through heartfelt worship and fellowship.
                    Everyone is welcome to join us
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="what-we-item wow fadeInUp" data-wow-delay="0.5s">
                <div className="icon-box">
                  <img src="/images/icon-what-we-3.svg" alt="" />
                </div>
                <div className="what-we-content">
                  <h3>educational programs</h3>
                  <p>
                    Experience spiritual growth and meaningful connection through heartfelt worship and fellowship.
                    Everyone is welcome to join us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="our-team">
        <div className="container">
          <div className="row align-items-center section-row">
            <div className="col-lg-12">
              <div className="section-title">
                <h3 className="wow fadeInUp">our team</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Meet Our <span>Pastors</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="team-member-item wow fadeInUp">
                <div className="team-image">
                  <figure className="image-anime">
                    <img src="/images/yendork.JPG" alt="" />
                  </figure>
                  <div className="team-social-icon">
                    <ul>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-content">
                  <h3>Joseph Yendork</h3>
                  <p>Youth Patron</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="team-member-item wow fadeInUp" data-wow-delay="0.25s">
                <div className="team-image">
                  <figure className="image-anime">
                    <img src="/images/team-2.jpg" alt="" />
                  </figure>
                  <div className="team-social-icon">
                    <ul>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-content">
                  <h3>sophia simmons</h3>
                  <p>pastor</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="team-member-item wow fadeInUp" data-wow-delay="0.5s">
                <div className="team-image">
                  <figure className="image-anime">
                    <img src="/images/team-3.jpg" alt="" />
                  </figure>
                  <div className="team-social-icon">
                    <ul>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-content">
                  <h3>savannah nguyen</h3>
                  <p>head of worship team</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="team-member-item wow fadeInUp" data-wow-delay="0.75s">
                <div className="team-image">
                  <figure className="image-anime">
                    <img src="/images/team-4.jpg" alt="" />
                  </figure>
                  <div className="team-social-icon">
                    <ul>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-icon">
                          <Icon name="twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-content">
                  <h3>charlotte wilson</h3>
                  <p>head of worship team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pastors Message */}
      <div className="pastors-message">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="pastors-image">
                <figure className="image-anime reveal">
                  <img src="/images/lol1 (2).jpg" alt="" />
                </figure>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="pastors-content">
                <div className="section-title">
                  <h3 className="wow fadeInUp">pastors message</h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Your generosity makes a <span>profound impact</span>
                  </h2>
                </div>

                <div className="pastors-content-body">
                  <h3 className="wow fadeInUp" data-wow-delay="0.25s">
                    Our mission is to share God&apos;s love, foster spiritual growth, and serve our community with
                    compassion and purpose.
                  </h3>
                  <p className="wow fadeInUp" data-wow-delay="0.5s">
                    We would love to get to know you better. Feel free to reach out to us through our Contact Us page,
                    or join us for one of our upcoming services or events. Our doors are always open, and we look
                    forward to welcoming you into our church family.
                  </p>
                </div>

                <div className="pastors-signature">
                  <div className="pastors-signature-img">
                    <img src="/images/pastors-signature.svg" alt="" />
                  </div>
                  <div className="pastors-signature-content">
                    <p>senior pastor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Value */}
      <div className="core-value">
        <div className="container">
          <div className="row align-items-center section-row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Foundations of Our Faith and <span>Community Life</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
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
                        Faith is the starting point of a relationship with God. In Christianity, for example, “without
                        faith it is impossible to please God” (Hebrews 11:6).
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
                        Church leaders provide emotional and spiritual support during tough times—loss, illness, family
                        problems.
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
                        Coming together for worship, prayer, and teaching helps create a shared experience and
                        spiritual unity.
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
                        As people grow spiritually, they come to know God more personally—not just through knowledge,
                        but through experience, prayer, and trust.
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
                        Visiting the sick, comforting the grieving, and supporting people in crisis flow from
                        Christ-like love.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="core-value-slider">
                <div className="swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="core-value-slider-img">
                        <figure className="image-anime">
                          <img src="/images/mimi.JPG" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="core-value-slider-img">
                        <figure className="image-anime">
                          <img src="/images/old.JPG" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="core-value-slider-img">
                        <figure className="image-anime">
                          <img src="/images/ga.JPG" alt="" />
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div className="core-value-btn">
                    <div className="core-value-button-prev" />
                    <div className="core-value-button-next" />
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

