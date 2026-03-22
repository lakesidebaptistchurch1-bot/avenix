import { Icon } from "@/components/Icon";


export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero hero-slider">
        <div className="hero-slider-layout">
          <div className="swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="hero-slide">
                  <div className="hero-slider-image">
                    <img src="/images/background.jpg" alt="" />
                    
                  </div>

                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="hero-content">
                          <div className="section-title">
                            <h1 className="text-anime-style-2" data-cursor="-opaque">
                              Loving god, loving others and serving the world !
                            </h1>
                            <p className="wow fadeInUp" data-wow-delay="0.25s">
                              Experience God&apos;s love and grace in a welcoming community where faith grows, hope thrives,
                              and everyone is cherished.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="hero-slide">
                  <div className="hero-slider-image">
                    <img src="/images/slide.jpg" alt="" />
                  </div>

                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="hero-content">
                          <div className="section-title">
                            <h1 className="text-anime-style-2" data-cursor="-opaque">
                              Loving god, loving others and serving the world !
                            </h1>
                            <p className="wow fadeInUp" data-wow-delay="0.25s">
                              Experience God&apos;s love and grace in a welcoming community where faith grows, hope thrives,
                              and everyone is cherished.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-pagination" />
          </div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="our-scrolling-ticker">
        <div className="scrolling-ticker-box">
          <div className="scrolling-content">
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
          </div>

          <div className="scrolling-content">
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
            <span>
              <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              Love Your Neighbor as yourself
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="about-us" id="home-about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-image">
                <div className="about-img-1">
                  <figure className="image-anime reveal">
                    <img src="/images/lem.jpg" alt="" />
                  </figure>
                </div>

                <div className="about-img-2">
                  <figure className="image-anime reveal">
                    <img src="/images/use.jpg" alt="" />
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

                <div className="about-us-footer wow fadeInUp" data-wow-delay="1s">
                  <a href="/about" className="btn-default">
                    read more about us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Worship */}
      <div className="join-worship">
        <div className="container">
          <div className="row section-row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Join us on Sunday at <span>8:00 & 9:00 AM</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="highlighted-worship-item wow fadeInUp">
                <div className="highlighted-worship-image">
                  <figure>
                    <a href="#" className="image-anime" data-cursor-text="View">
                      <img src="/images/27.jpg" alt="" />
                    </a>
                  </figure>
                </div>

                <div className="highlighted-worship-body">
                  <div className="highlighted-worship-content">
                    <h3>youth worship</h3>
                    <p>Engaging teens in faith, fellowship, growth.</p>
                  </div>
                  <div className="highlighted-worship-btn">
                    <a href="#" className="readmore-btn">
                      <img src="/images/arrow-white.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="worship-box">
                <div className="worship-item wow fadeInUp" data-wow-delay="0.25s">
                  <div className="worship-image">
                    <figure>
                      <a href="#" className="image-anime" data-cursor-text="View">
                        <img src="/images/68.jpg" alt="" />
                      </a>
                    </figure>
                  </div>

                  <div className="worship-body">
                    <div className="worship-content">
                      <h3>children&apos;s worship</h3>
                      <p>Fun, faith-filled worship for kids ages 4-12.</p>
                    </div>
                    <div className="worship-btn">
                      <a href="#" className="readmore-btn">
                        <img src="/images/arrow-white.svg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="worship-item wow fadeInUp" data-wow-delay="0.5s">
                  <div className="worship-image">
                    <figure>
                      <a href="#" className="image-anime" data-cursor-text="View">
                        <img src="/images/mimi.JPG" alt="" />
                      </a>
                    </figure>
                  </div>

                  <div className="worship-body">
                    <div className="worship-content">
                      <h3>sunday school worship</h3>
                      <p>Learning and worship for all ages.</p>
                    </div>
                    <div className="worship-btn">
                      <a href="#" className="readmore-btn">
                        <img src="/images/arrow-white.svg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="worship-item wow fadeInUp" data-wow-delay="0.75s">
                  <div className="worship-image">
                    <figure>
                      <a href="#" className="image-anime" data-cursor-text="View">
                        <img src="/images/background.jpg" alt="" />
                      </a>
                    </figure>
                  </div>
                  <div className="worship-body">
                    <div className="worship-content">
                      <h3>more worship</h3>
                      <p>Join us for worship and fellowship.</p>
                    </div>
                    <div className="worship-btn">
                      <a href="#" className="readmore-btn">
                        <img src="/images/arrow-white.svg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="our-mission">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="mission-content">
                <div className="section-title">
                  <h3 className="wow fadeInUp">our mission</h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Our Mission to Serve, <span>Love, and Grow</span>
                  </h2>
                </div>

                <div className="mission-content-body">
                  <h3 className="wow fadeInUp" data-wow-delay="0.25s">
                    Our mission is to share God&apos;s love, foster spiritual growth, and serve our community with
                    compassion and purpose.
                  </h3>
                  <p className="wow fadeInUp" data-wow-delay="0.5s">
                    Our mission is to share God&apos;s love and grace by fostering spiritual growth, serving our community
                    with compassion, and building meaningful relationships. We are dedicated to living out our faith
                    through worship, outreach, and impactful service.
                  </p>
                </div>

                <div className="mission-content-footer wow fadeInUp" data-wow-delay="0.75s">
                  <a href="/contact" className="btn-default">
                    contact now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mission-image">
                <div className="mission-img">
                  <figure className="image-anime reveal">
                    <img src="/images/borga.JPG" alt="" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services */}
      <div className="our-services">
        <div className="container">
          <div className="row section-row">
            <div className="section-title">
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Loving god, helping others and serving the <span>world together</span>
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="service-item wow fadeInUp">
                <div className="icon-box">
                  <img src="/images/icon-service-1.svg" alt="" />
                </div>
                <div className="service-body">
                  <p>
                    Compassionate support for grief, relationships, and personal struggles. Join our monthly groups or
                    schedule counseling.
                  </p>
                </div>
                <div className="service-footer">
                  <div className="service-content">
                    <h3>support groups</h3>
                  </div>
                  <div className="service-btn">
                    <a href="/services" className="readmore-btn">
                      <img src="/images/arrow-white.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-item wow fadeInUp" data-wow-delay="0.25s">
                <div className="icon-box">
                  <img src="/images/icon-service-2.svg" alt="" />
                </div>
                <div className="service-body">
                  <p>Join us for special events, including holiday services, picnics, and community fundraisers.</p>
                </div>
                <div className="service-footer">
                  <div className="service-content">
                    <h3>special events</h3>
                  </div>
                  <div className="service-btn">
                    <a href="/event" className="readmore-btn">
                      <img src="/images/arrow-white.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-item wow fadeInUp" data-wow-delay="0.5s">
                <div className="icon-box">
                  <img src="/images/icon-service-3.svg" alt="" />
                </div>
                <div className="service-body">
                  <p>Join our online services for live streams of Sunday worship and virtual Bible studies.</p>
                </div>
                <div className="service-footer">
                  <div className="service-content">
                    <h3>online services</h3>
                  </div>
                  <div className="service-btn">
                    <a href="/services" className="readmore-btn">
                      <img src="/images/arrow-white.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-item wow fadeInUp" data-wow-delay="0.75s">
                <div className="icon-box">
                  <img src="/images/icon-service-4.svg" alt="" />
                </div>
                <div className="service-body">
                  <p>
                    Receive compassionate pastoral care through one-on-one counseling and visits, addressing spiritual
                    needs and personal challenges with care.
                  </p>
                </div>
                <div className="service-footer">
                  <div className="service-content">
                    <h3>pastoral care</h3>
                  </div>
                  <div className="service-btn">
                    <a href="/services" className="readmore-btn">
                      <img src="/images/arrow-white.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Ministries */}
      <div className="our-ministries">
        <div className="container">
          <div className="row section-row">
            <div className="section-title">
              <h3 className="wow fadeInUp">ministries</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Our Latest <span>Ministries</span>
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="ministries-item wow fadeInUp">
                <div className="ministries-image" data-cursor-text="View">
                  <a href="/ministries">
                    <figure>
                      <img src="/images/CC.JPG" alt="" />
                    </figure>
                  </a>
                </div>
                <div className="ministries-content">
                  <h3>Children&apos;s</h3>
                </div>
                <div className="ministries-btn">
                  <a href="/ministries" className="readmore-btn">
                    <img src="/images/arrow-white.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ministries-item wow fadeInUp" data-wow-delay="0.25s">
                <div className="ministries-image" data-cursor-text="View">
                  <a href="/ministries">
                    <figure>
                      <img src="/images/C2.JPG" alt="" />
                    </figure>
                  </a>
                </div>
                <div className="ministries-content">
                  <h3>youth</h3>
                </div>
                <div className="ministries-btn">
                  <a href="/ministries" className="readmore-btn">
                    <img src="/images/arrow-white.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ministries-item wow fadeInUp" data-wow-delay="0.5s">
                <div className="ministries-image" data-cursor-text="View">
                  <a href="/ministries">
                    <figure>
                      <img src="/images/PRAYER.JPG" alt="" />
                    </figure>
                  </a>
                </div>
                <div className="ministries-content">
                  <h3>prayer</h3>
                </div>
                <div className="ministries-btn">
                  <a href="/ministries" className="readmore-btn">
                    <img src="/images/arrow-white.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="our-ministries-footer wow fadeInUp" data-wow-delay="0.75s">
                <p>
                  Explore the exciting new ways we are serving our community and growing together in faith with our
                  latest ministry initiatives. <a href="/ministries">View All Ministries</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Sermons */}
      <div className="our-sermons">
        <div className="container">
          <div className="row section-row">
            <div className="section-title">
              <h3 className="wow fadeInUp">our sermons</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Our Latest <span>Sermons</span>
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="sermons-item wow fadeInUp">
                <div className="sermons-image">
                  <figure>
                    <a href="/sermons" className="image-anime" data-cursor-text="View">
                      <img src="/images/MR. LAWAL.JPG" alt="" />
                    </a>
                  </figure>
                  <div className="sermons-meta">
                    <h3>27</h3>
                    <p>APR</p>
                  </div>
                  <div className="sermons-audio-icon">
                    <a href="/sermons">
                      <img src="/images/audio-play-icon.svg" alt="" />
                    </a>
                  </div>
                </div>

                <div className="sermons-body">
                  <div className="sermons-title">
                    <h2>STEPS TO PROMOTION</h2>
                  </div>
                  <div className="sermons-list">
                    <ul>
                      <li>
                        <Icon name="user" />
                        Sermon From : <span>REV. OLUWATOYIN LAWAL</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="sermons-item wow fadeInUp" data-wow-delay="0.25s">
                <div className="sermons-image">
                  <figure>
                    <a href="/sermons" className="image-anime" data-cursor-text="View">
                      <img src="/images/REV. EDGAR.JPG" alt="" />
                    </a>
                  </figure>
                  <div className="sermons-meta">
                    <h3>20</h3>
                    <p>APR</p>
                  </div>
                  <div className="sermons-audio-icon">
                    <a href="/sermons">
                      <img src="/images/audio-play-icon.svg" alt="" />
                    </a>
                  </div>
                </div>

                <div className="sermons-body">
                  <div className="sermons-title">
                    <h2>THE POWER OF HIS RESURRECTION</h2>
                  </div>
                  <div className="sermons-list">
                    <ul>
                      <li>
                        <Icon name="user" />
                        Sermon From : <span>REV.EDGAR NASHIEF</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="sermons-item wow fadeInUp" data-wow-delay="0.5s">
                <div className="sermons-image">
                  <figure>
                    <a href="/sermons" className="image-anime" data-cursor-text="View">
                      <img src="/images/lol1 (2).jpg" alt="" />
                    </a>
                  </figure>
                  <div className="sermons-meta">
                    <h3>03</h3>
                    <p>aug</p>
                  </div>
                  <div className="sermons-audio-icon">
                    <a href="/sermons">
                      <img src="/images/audio-play-icon.svg" alt="" />
                    </a>
                  </div>
                </div>

                <div className="sermons-body">
                  <div className="sermons-title">
                    <h2>IMPORTANCE OF PRAISE</h2>
                  </div>
                  <div className="sermons-list">
                    <ul>
                      <li>
                        <Icon name="user" />
                        Sermon From : <span>REV.EDGAR NASHIEF</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verse section */}
      <div className="verse-church">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="verse-church-content">
                <div className="section-title">
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Life is a Church that Loves <span>God and People.</span>
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay="0.25s">
                    Life is a church dedicated to loving God and serving people. We foster a welcoming community where
                    faith and compassion drive everything we do, striving to make a positive impact both spiritually
                    and socially. Join us in this journey.
                  </p>
                </div>

                <div className="verse-church-btn wow fadeInUp" data-wow-delay="0.5s">
                  <a href="/donation#donate-section" className="btn-default">
                    donate now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-box">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-9">
              <div className="cta-box-content">
                <div className="section-title">
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Get Involved and Stay Connected: Support Our Mission and Join Our Community Today!
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="cta-box-btn wow fadeInUp">
                <a
                  href="https://chat.whatsapp.com/HG9Dk2jnpai4g6zwfORUtA"
                  className="btn-default btn-highlighted"
                  target="_blank"
                  rel="noreferrer"
                >
                  join group
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donate now */}
      <div className="donate-now parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-4">
              <div className="intro-video-box">
                <div className="video-play-button">
                  <a
                    href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                    className="popup-video"
                    data-cursor-text="Play"
                  >
                   <h1>Play</h1>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-8">
              <div className="donate-box">
                <div className="section-title">
                  <h3 className="wow fadeInUp">donate now</h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Support <span>Our Mission</span>
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay="0.25s">
                    Your generous support enables to continue its mission of spreading God&apos;s love and serving our
                    community.
                  </p>
                </div>

                <div className="donate-form wow fadeInUp" data-wow-delay="0.5s">
                  <form id="donateForm" action="/donation#donate-section" method="GET">
                    <div className="form-group mb-4">
                      <input type="text" name="amount" className="form-control" placeholder="donate now ..." required />
                    </div>

                    <fieldset className="donate-value-box">
                      <div className="donate-value">
                        <input type="radio" id="value1" name="value" value="100" defaultChecked />
                        <label htmlFor="value1">GH 100.00</label>
                      </div>

                      <div className="donate-value">
                        <input type="radio" id="value2" name="value" value="200" />
                        <label htmlFor="value2">GH 200.00</label>
                      </div>

                      <div className="donate-value">
                        <input type="radio" id="value3" name="value" value="300" />
                        <label htmlFor="value3">GH 300.00</label>
                      </div>

                      <div className="donate-value">
                        <input type="radio" id="value4" name="value" value="400" />
                        <label htmlFor="value4">GH 400.00</label>
                      </div>

                      <div className="donate-value">
                        <input type="radio" id="value5" name="value" value="500" />
                        <label htmlFor="value5">GH 500.00</label>
                      </div>

                      <div className="donate-value">
                        <input type="radio" id="value6" name="value" value="600" />
                        <label htmlFor="value6">GH 600.00</label>
                      </div>
                    </fieldset>

                    <div className="form-group-btn">
                      <button type="submit" className="btn-default">
                        donate now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Newsletter */}
      <div className="subscribe-newsletter parallaxie">
        <div className="container">
          <div className="row section-row">
            <div className="col-lg-12">
              <div className="section-title">
                <h3 className="wow fadeInUp">subscribe newsletter</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Keep Up With Our <span>Latest News</span>
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.25s">
                  Subscribe to our newsletter to stay informed about upcoming events, inspiring messages, and the
                  latest news from our church community.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="subscribe-newsletter-form wow fadeInUp" data-wow-delay="0.5s">
                <form id="newslettersForm" action="#" method="POST">
                  <div className="form-group">
                    <input type="email" name="email" className="form-control" id="mail" placeholder="Your Email..." required />
                    <button type="submit" className="subscribe-btn">
                      subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

