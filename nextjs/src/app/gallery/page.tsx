import { BodyClass } from "@/components/BodyClass";
import { Icon } from "@/components/Icon";

export default function GalleryPage() {
  return (
    <>
      <BodyClass className="gallery-ui-pro" />

      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Gallery
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="gallery-intro">
        <div className="container">
          <div className="gallery-hero">
            <div className="gallery-hero-content">
              <span className="gallery-eyebrow wow fadeInUp">Gallery</span>
              <h2 className="wow fadeInUp">A Beautiful Story in Every Frame</h2>
              <p className="wow fadeInUp" data-wow-delay="0.2s">
                Discover worship, fellowship, and outreach through carefully captured moments. Each image reflects the
                heart of our church family.
              </p>
              <div className="gallery-hero-stats wow fadeInUp" data-wow-delay="0.3s">
                <div className="stat-item">
                  <h3>150+</h3>
                  <p>Moments captured</p>
                </div>
                <div className="stat-item">
                  <h3>20+</h3>
                  <p>Community programs</p>
                </div>
                <div className="stat-item">
                  <h3>Weekly</h3>
                  <p>New memories</p>
                </div>
              </div>
              <div className="gallery-actions wow fadeInUp" data-wow-delay="0.4s">
                <a href="/services" className="btn-default">
                  Plan a Visit
                </a>
                <a href="/contact" className="btn-default btn-highlighted">
                  Join Our Community
                </a>
              </div>
            </div>

            <div className="gallery-hero-media wow fadeInRight">
              <div className="media-main">
                <img src="/images/congregation.JPG" alt="" />
                <div className="media-badge">
                  <Icon name="star" />
                  <span>Trusted by families</span>
                </div>
              </div>
              <div className="media-stack">
                <img src="/images/slide.jpg" alt="" />
                <img src="/images/MR. LAWAL.JPG" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-featured">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="wow fadeInUp">Featured Moments</h2>
            <p className="wow fadeInUp" data-wow-delay="0.2s">
              Highlights from worship, outreach, and community life that make every week unforgettable.
            </p>
          </div>

          <div className="featured-grid">
            <article className="featured-card wow fadeInUp">
              <figure className="featured-media">
                <img src="/images/choir.jpg" alt="Choir leading worship" />
              </figure>
              <div className="featured-content">
                <span className="featured-badge">Worship</span>
                <h3>Choir Worship Night</h3>
                <p>Powerful praise that lifted hearts and united the congregation.</p>
                <div className="featured-meta">
                  <span>Music Ministry</span>
                  <span>•</span>
                  <span>Sunday Service</span>
                </div>
              </div>
            </article>

            <article className="featured-card wow fadeInUp" data-wow-delay="0.1s">
              <figure className="featured-media">
                <img src="/images/share.jpg" alt="Community outreach" />
              </figure>
              <div className="featured-content">
                <span className="featured-badge">Outreach</span>
                <h3>Community Outreach</h3>
                <p>Serving with compassion, meeting needs, and sharing hope.</p>
                <div className="featured-meta">
                  <span>Community Care</span>
                  <span>•</span>
                  <span>Local Impact</span>
                </div>
              </div>
            </article>

            <article className="featured-card wow fadeInUp" data-wow-delay="0.2s">
              <figure className="featured-media">
                <img src="/images/celebration.jpg" alt="Celebration service" />
              </figure>
              <div className="featured-content">
                <span className="featured-badge">Celebration</span>
                <h3>Faith Celebration</h3>
                <p>A joyful gathering celebrating milestones and answered prayers.</p>
                <div className="featured-meta">
                  <span>Special Service</span>
                  <span>•</span>
                  <span>Church Family</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="page-gallery gallery-showcase">
        <div className="container">
          <div className="gallery-masonry gallery-items">
            <a
              className="masonry-card size-lg wow fadeInUp"
              data-cursor-text="View"
              href="/images/lol1 (2).jpg"
            >
              <figure className="masonry-media">
                <img src="/images/lol1 (2).jpg" alt="Worship celebration" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Worship</span>
                <span className="gallery-title">Sunday Celebration</span>
                <span className="gallery-meta">Praise • Community</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="0.1s"
              data-cursor-text="View"
              href="/images/lol1 (1).jpg"
            >
              <figure className="masonry-media">
                <img src="/images/lol1 (1).jpg" alt="Congregation worship" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Faith</span>
                <span className="gallery-title">Hearts In Unity</span>
                <span className="gallery-meta">Congregation • Hope</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="0.2s"
              data-cursor-text="View"
              href="/images/lol1 (4).jpg"
            >
              <figure className="masonry-media">
                <img src="/images/lol1 (4).jpg" alt="Choir performance" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Music</span>
                <span className="gallery-title">Voices Of Hope</span>
                <span className="gallery-meta">Choir • Harmony</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="0.3s"
              data-cursor-text="View"
              href="/images/lol1 (5).jpg"
            >
              <figure className="masonry-media">
                <img src="/images/lol1 (5).jpg" alt="Prayer moment" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Prayer</span>
                <span className="gallery-title">Moments Of Prayer</span>
                <span className="gallery-meta">Reflection • Peace</span>
              </span>
            </a>

            <a
              className="masonry-card size-lg wow fadeInUp"
              data-wow-delay="0.4s"
              data-cursor-text="View"
              href="/images/lol1 (6).jpg"
            >
              <figure className="masonry-media">
                <img src="/images/lol1 (6).jpg" alt="Church fellowship" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Fellowship</span>
                <span className="gallery-title">Family Fellowship</span>
                <span className="gallery-meta">Community • Love</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="0.5s"
              data-cursor-text="View"
              href="/images/lem.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/lem.jpg" alt="Outreach team" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Outreach</span>
                <span className="gallery-title">Serving Together</span>
                <span className="gallery-meta">Service • Impact</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="0.6s"
              data-cursor-text="View"
              href="/images/Afia.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/Afia.jpg" alt="Women fellowship" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Women</span>
                <span className="gallery-title">Women Of Faith</span>
                <span className="gallery-meta">Growth • Fellowship</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="0.7s"
              data-cursor-text="View"
              href="/images/Josh.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/Josh.jpg" alt="Youth ministry" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Youth</span>
                <span className="gallery-title">Rising Generation</span>
                <span className="gallery-meta">Ministry • Purpose</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="0.8s"
              data-cursor-text="View"
              href="/images/Paula.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/Paula.jpg" alt="Community event" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Events</span>
                <span className="gallery-title">Community Moments</span>
                <span className="gallery-meta">Connection • Joy</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="0.9s"
              data-cursor-text="View"
              href="/images/Media.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/Media.jpg" alt="Media team" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Media</span>
                <span className="gallery-title">Media Ministry</span>
                <span className="gallery-meta">Creative • Service</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="1s"
              data-cursor-text="View"
              href="/images/celebration.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/celebration.jpg" alt="Celebration service" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Celebration</span>
                <span className="gallery-title">Faith Celebrations</span>
                <span className="gallery-meta">Joy • Worship</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="1.1s"
              data-cursor-text="View"
              href="/images/Blessing.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/Blessing.jpg" alt="Blessing moment" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Blessing</span>
                <span className="gallery-title">Blessed Together</span>
                <span className="gallery-meta">Gratitude • Prayer</span>
              </span>
            </a>

            <a
              className="masonry-card size-lg wow fadeInUp"
              data-wow-delay="1.2s"
              data-cursor-text="View"
              href="/images/choir.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/choir.jpg" alt="Choir worship" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Choir</span>
                <span className="gallery-title">Choir Harmony</span>
                <span className="gallery-meta">Music • Worship</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="1.3s"
              data-cursor-text="View"
              href="/images/191.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/191.jpg" alt="Church service" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Service</span>
                <span className="gallery-title">Grace In Action</span>
                <span className="gallery-meta">Faith • Impact</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="1.4s"
              data-cursor-text="View"
              href="/images/68.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/68.jpg" alt="Community gathering" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Community</span>
                <span className="gallery-title">Gathered In Love</span>
                <span className="gallery-meta">Joy • Together</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="1.5s"
              data-cursor-text="View"
              href="/images/211.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/211.jpg" alt="Worship service" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Worship</span>
                <span className="gallery-title">Sanctuary Praise</span>
                <span className="gallery-meta">Spirit • Joy</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="1.6s"
              data-cursor-text="View"
              href="/images/192.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/192.jpg" alt="Fellowship moment" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Fellowship</span>
                <span className="gallery-title">Warm Fellowship</span>
                <span className="gallery-meta">Care • Unity</span>
              </span>
            </a>

            <a
              className="masonry-card size-lg wow fadeInUp"
              data-wow-delay="1.7s"
              data-cursor-text="View"
              href="/images/Music.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/Music.jpg" alt="Praise team" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Music</span>
                <span className="gallery-title">Praise Team</span>
                <span className="gallery-meta">Worship • Sound</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="1.8s"
              data-cursor-text="View"
              href="/images/pappoe.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/pappoe.jpg" alt="Leadership gathering" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Leadership</span>
                <span className="gallery-title">Leadership Moments</span>
                <span className="gallery-meta">Vision • Guidance</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="1.9s"
              data-cursor-text="View"
              href="/images/69.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/69.jpg" alt="Church program" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Program</span>
                <span className="gallery-title">Program Highlights</span>
                <span className="gallery-meta">Events • Worship</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="2s"
              data-cursor-text="View"
              href="/images/52.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/52.jpg" alt="Fellowship event" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Fellowship</span>
                <span className="gallery-title">Faithful Friends</span>
                <span className="gallery-meta">Joy • Connection</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="2.1s"
              data-cursor-text="View"
              href="/images/27.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/27.jpg" alt="Church gathering" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Gathering</span>
                <span className="gallery-title">Gathering Of Grace</span>
                <span className="gallery-meta">Faith • Community</span>
              </span>
            </a>

            <a
              className="masonry-card size-lg wow fadeInUp"
              data-wow-delay="2.2s"
              data-cursor-text="View"
              href="/images/dede mom.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/dede mom.jpg" alt="Celebration gathering" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Celebration</span>
                <span className="gallery-title">Celebration Day</span>
                <span className="gallery-meta">Joy • Fellowship</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="2.3s"
              data-cursor-text="View"
              href="/images/share.jpg"
            >
              <figure className="masonry-media">
                <img src="/images/share.jpg" alt="Community sharing" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Outreach</span>
                <span className="gallery-title">Serving With Love</span>
                <span className="gallery-meta">Care • Giving</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="2.4s"
              data-cursor-text="View"
              href="/images/congregation.JPG"
            >
              <figure className="masonry-media">
                <img src="/images/congregation.JPG" alt="Congregation worship" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Worship</span>
                <span className="gallery-title">United In Worship</span>
                <span className="gallery-meta">Praise • Together</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="2.5s"
              data-cursor-text="View"
              href="/images/camera.JPG"
            >
              <figure className="masonry-media">
                <img src="/images/camera.JPG" alt="Media coverage" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Media</span>
                <span className="gallery-title">Captured Moments</span>
                <span className="gallery-meta">Story • Memory</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="2.6s"
              data-cursor-text="View"
              href="/images/ga.JPG"
            >
              <figure className="masonry-media">
                <img src="/images/ga.JPG" alt="Community outreach" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Outreach</span>
                <span className="gallery-title">Outreach Love</span>
                <span className="gallery-meta">Service • Hope</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="2.7s"
              data-cursor-text="View"
              href="/images/girls.JPG"
            >
              <figure className="masonry-media">
                <img src="/images/girls.JPG" alt="Youth group" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Youth</span>
                <span className="gallery-title">Youth Fellowship</span>
                <span className="gallery-meta">Growth • Joy</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="2.8s"
              data-cursor-text="View"
              href="/images/nabila.JPG"
            >
              <figure className="masonry-media">
                <img src="/images/nabila.JPG" alt="Community member" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Community</span>
                <span className="gallery-title">Faithful Smiles</span>
                <span className="gallery-meta">Care • Warmth</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="2.9s"
              data-cursor-text="View"
              href="/images/umm.JPG"
            >
              <figure className="masonry-media">
                <img src="/images/umm.JPG" alt="Church family" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Family</span>
                <span className="gallery-title">Church Family</span>
                <span className="gallery-meta">Love • Together</span>
              </span>
            </a>

            <a
              className="masonry-card size-lg wow fadeInUp"
              data-wow-delay="3s"
              data-cursor-text="View"
              href="/images/old.JPG"
            >
              <figure className="masonry-media">
                <img src="/images/old.JPG" alt="Senior members" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Heritage</span>
                <span className="gallery-title">Legacy Of Faith</span>
                <span className="gallery-meta">Wisdom • Grace</span>
              </span>
            </a>

            <a
              className="masonry-card size-sm wow fadeInUp"
              data-wow-delay="3.1s"
              data-cursor-text="View"
              href="/images/mimi.JPG"
            >
              <figure className="masonry-media">
                <img src="/images/mimi.JPG" alt="Worship smiles" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Joy</span>
                <span className="gallery-title">Joyful Hearts</span>
                <span className="gallery-meta">Worship • Joy</span>
              </span>
            </a>

            <a
              className="masonry-card size-md wow fadeInUp"
              data-wow-delay="3.2s"
              data-cursor-text="View"
              href="/images/borga.JPG"
            >
              <figure className="masonry-media">
                <img src="/images/borga.JPG" alt="Community gathering" />
              </figure>
              <span className="masonry-overlay">
                <span className="gallery-tag">Community</span>
                <span className="gallery-title">Together In Grace</span>
                <span className="gallery-meta">Faith • Connection</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="gallery-cta">
        <div className="container">
          <div className="gallery-cta-content wow fadeInUp">
            <h2>Be Part of the Story</h2>
            <p>
              Every photo represents a moment of faith, love, and connection. Come worship with us, join a ministry
              team, or attend an event to create the next memory together.
            </p>
            <div className="gallery-cta-actions">
              <a href="/services" className="btn-default">
                View Service Times
              </a>
              <a href="/contact" className="btn-default btn-highlighted">
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

