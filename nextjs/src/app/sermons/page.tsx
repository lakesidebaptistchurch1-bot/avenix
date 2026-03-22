import { BodyClass } from "@/components/BodyClass";
import { Icon } from "@/components/Icon";

export default function SermonsPage() {
  return (
    <>
      <BodyClass className="sermons-page" />

      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  sermons
                </h1>
                <p className="page-header-text wow fadeInUp" data-wow-delay="0.2s">
                  Catch up on powerful messages, practical teaching, and weekly worship moments that build your faith
                  and encourage your walk with God.
                </p>
                <div className="page-header-cta wow fadeInUp" data-wow-delay="0.35s">
                  <a href="/sermons-single" className="btn-default">
                    Watch Latest Sermon
                  </a>
                  <a
                    href="http://www.youtube.com/@lakesidebaptistchurchab1"
                    className="btn-default btn-border"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Subscribe on YouTube
                  </a>
                </div>
                <div className="sermons-hero-badges wow fadeInUp" data-wow-delay="0.5s">
                  <span>Weekly updates</span>
                  <span>Audio + video</span>
                  <span>Bible-based teaching</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-sermons">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="sermons-item wow fadeInUp">
                <div className="sermons-image">
                  <figure>
                    <a href="/sermons-single" className="image-anime" data-cursor-text="View">
                      <img src="/images/sermons-img-1.jpg" alt="" />
                    </a>
                  </figure>
                  <div className="sermons-meta">
                    <h3>01</h3>
                    <p>aug</p>
                  </div>
                  <div className="sermons-audio-icon">
                    <a href="/sermons-single">
                      <img src="/images/audio-play-icon.svg" alt="" />
                    </a>
                  </div>
                </div>

                <div className="sermons-body">
                  <div className="sermons-title">
                    <h2>Start a New Way of Living</h2>
                  </div>
                  <div className="sermons-list">
                    <ul>
                      <li>
                        <Icon name="user" />
                        Sermon From : <span>John Due</span>
                      </li>
                      <li>
                        <Icon name="tag" />
                        Categories : <span>Pray</span>
                      </li>
                      <li>
                        <Icon name="calendar-days" />
                        Date &amp; Time : <span>Aug 01 - on 7:00 am - 11:00 am</span>
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
                    <a href="/sermons-single" className="image-anime" data-cursor-text="View">
                      <img src="/images/sermons-img-2.jpg" alt="" />
                    </a>
                  </figure>
                  <div className="sermons-meta">
                    <h3>03</h3>
                    <p>aug</p>
                  </div>
                  <div className="sermons-audio-icon">
                    <a href="/sermons-single">
                      <img src="/images/audio-play-icon.svg" alt="" />
                    </a>
                  </div>
                </div>

                <div className="sermons-body">
                  <div className="sermons-title">
                    <h2>overcoming life&apos;s challenges</h2>
                  </div>
                  <div className="sermons-list">
                    <ul>
                      <li>
                        <Icon name="user" />
                        Sermon From : <span>John Due</span>
                      </li>
                      <li>
                        <Icon name="tag" />
                        Categories : <span>Pray</span>
                      </li>
                      <li>
                        <Icon name="calendar-days" />
                        Date &amp; Time : <span>Aug 03 - on 7:00 am - 11:00 am</span>
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
                    <a href="/sermons-single" className="image-anime" data-cursor-text="View">
                      <img src="/images/sermons-img-3.jpg" alt="" />
                    </a>
                  </figure>
                  <div className="sermons-meta">
                    <h3>08</h3>
                    <p>aug</p>
                  </div>
                  <div className="sermons-audio-icon">
                    <a href="/sermons-single">
                      <img src="/images/audio-play-icon.svg" alt="" />
                    </a>
                  </div>
                </div>

                <div className="sermons-body">
                  <div className="sermons-title">
                    <h2>hope in times of trouble</h2>
                  </div>
                  <div className="sermons-list">
                    <ul>
                      <li>
                        <Icon name="user" />
                        Sermon From : <span>John Due</span>
                      </li>
                      <li>
                        <Icon name="tag" />
                        Categories : <span>Pray</span>
                      </li>
                      <li>
                        <Icon name="calendar-days" />
                        Date &amp; Time : <span>Aug 08 - on 7:00 am - 11:00 am</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="sermons-item wow fadeInUp" data-wow-delay="0.75s">
                <div className="sermons-image">
                  <figure>
                    <a href="/sermons-single" className="image-anime" data-cursor-text="View">
                      <img src="/images/sermons-img-4.jpg" alt="" />
                    </a>
                  </figure>
                  <div className="sermons-meta">
                    <h3>11</h3>
                    <p>aug</p>
                  </div>
                  <div className="sermons-audio-icon">
                    <a href="/sermons-single">
                      <img src="/images/audio-play-icon.svg" alt="" />
                    </a>
                  </div>
                </div>

                <div className="sermons-body">
                  <div className="sermons-title">
                    <h2>building stronger faith</h2>
                  </div>
                  <div className="sermons-list">
                    <ul>
                      <li>
                        <Icon name="user" />
                        Sermon From : <span>John Due</span>
                      </li>
                      <li>
                        <Icon name="tag" />
                        Categories : <span>Pray</span>
                      </li>
                      <li>
                        <Icon name="calendar-days" />
                        Date &amp; Time : <span>Aug 11 - on 7:00 am - 11:00 am</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="sermons-item wow fadeInUp" data-wow-delay="1s">
                <div className="sermons-image">
                  <figure>
                    <a href="/sermons-single" className="image-anime" data-cursor-text="View">
                      <img src="/images/sermons-img-5.jpg" alt="" />
                    </a>
                  </figure>
                  <div className="sermons-meta">
                    <h3>15</h3>
                    <p>aug</p>
                  </div>
                  <div className="sermons-audio-icon">
                    <a href="/sermons-single">
                      <img src="/images/audio-play-icon.svg" alt="" />
                    </a>
                  </div>
                </div>

                <div className="sermons-body">
                  <div className="sermons-title">
                    <h2>embracing god&apos;s plan</h2>
                  </div>
                  <div className="sermons-list">
                    <ul>
                      <li>
                        <Icon name="user" />
                        Sermon From : <span>John Due</span>
                      </li>
                      <li>
                        <Icon name="tag" />
                        Categories : <span>Pray</span>
                      </li>
                      <li>
                        <Icon name="calendar-days" />
                        Date &amp; Time : <span>Aug 15 - on 7:00 am - 11:00 am</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="page-pagination wow fadeInUp" data-wow-delay="0.5s">
                <ul className="pagination">
                  <li>
                    <a href="#">
                      <Icon name="arrow-left" />
                    </a>
                  </li>
                  <li className="active">
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li>
                    <a href="#">
                      <Icon name="arrow-right" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

