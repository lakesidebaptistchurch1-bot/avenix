export default function MinistriesPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Ministries
                </h1>
                <nav className="wow fadeInUp" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-ministries">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="ministries-item wow fadeInUp">
                <div className="ministries-image" data-cursor-text="View">
                  <a href="/ministry-single">
                    <figure>
                      <img src="/images/lol1 (1).jpg" alt="" />
                    </figure>
                  </a>
                </div>
                <div className="ministries-content">
                  <h3>Men</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ministries-item wow fadeInUp" data-wow-delay="0.25s">
                <div className="ministries-image" data-cursor-text="View">
                  <a href="/ministry-single">
                    <figure>
                      <img src="/images/lol1 (2).jpg" alt="" />
                    </figure>
                  </a>
                </div>
                <div className="ministries-content">
                  <h3>youth</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ministries-item wow fadeInUp" data-wow-delay="0.5s">
                <div className="ministries-image" data-cursor-text="View">
                  <a href="/ministry-single">
                    <figure>
                      <img src="/images/lol1 (5).jpg" alt="" />
                    </figure>
                  </a>
                </div>
                <div className="ministries-content">
                  <h3>Women</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="ministries-item wow fadeInUp" data-wow-delay="0.75s">
                <div className="ministries-image" data-cursor-text="View">
                  <a href="/ministry-single">
                    <figure>
                      <img src="/images/lem.jpg" alt="" />
                    </figure>
                  </a>
                </div>
                <div className="ministries-content">
                  <h3>Children&apos;s and Teams</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

