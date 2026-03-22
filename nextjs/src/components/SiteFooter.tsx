import Link from "next/link";
import { Icon } from "@/components/Icon";

export function SiteFooter() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="about-footer">
              <div className="footer-logo">
                <img src="/images/church_logo_blue-removebg-preview (1).png" alt="" />
              </div>

              <div className="about-footer-content">
                <p>
                  Lakeside Baptist Church is a warm, Bible centered family committed to worship, discipleship, and
                  community impact. Come as you are and grow with us.
                </p>
              </div>

              <div className="footer-social-links">
                <ul>
                  <li>
                    <a href="https://web.facebook.com/lbcghana" target="_blank" rel="noreferrer">
                      <Icon name="facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="http://www.youtube.com/@lakesidebaptistchurchab1" target="_blank" rel="noreferrer">
                      <Icon name="youtube" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@lakeside.baptist?_t=ZM-8vTWQDHwKiV&_r=1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="tiktok" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/lakesidebaptistchurchab?igsh=MWp1OXE3ODYwdGdncg=="
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <div className="footer-links">
              <h3>quick links</h3>
              <ul>
                <li>
                  <Link href="/">home</Link>
                </li>
                <li>
                  <Link href="/about">our church</Link>
                </li>
                <li>
                  <Link href="/services">services</Link>
                </li>
                <li>
                  <Link href="/event">event</Link>
                </li>
                <li>
                  <Link href="/blog">news</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-6">
            <div className="footer-links">
              <h3>our services</h3>
              <ul>
                <li>
                  <Link href="/services">support groups</Link>
                </li>
                <li>
                  <Link href="/event">special events</Link>
                </li>
                <li>
                  <Link href="/services">online services</Link>
                </li>
                <li>
                  <Link href="/services">pastoral care</Link>
                </li>
                <li>
                  <Link href="/services">sunday worship</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-5">
            <div className="footer-contact">
              <h3>contact</h3>
              <div className="footer-contact-details">
                <div className="footer-info-box">
                  <div className="icon-box">
                    <img src="/images/icon-phone.svg" alt="" />
                  </div>
                  <div className="footer-info-box-content">
                    <p>(+233) 24 838 3745</p>
                  </div>
                </div>

                <div className="footer-info-box">
                  <div className="icon-box">
                    <img src="/images/icon-mail.svg" alt="" />
                  </div>
                  <div className="footer-info-box-content">
                    <p>lakesidebaptistchurch1@gmail.com</p>
                  </div>
                </div>

                <div className="footer-info-box">
                  <div className="icon-box">
                    <img src="/images/icon-location.svg" alt="" />
                  </div>
                  <div className="footer-info-box-content">
                    <p>PV9H+7R7 Lakeside Estate, Accra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="footer-copyright-text">
                <p>Copyright 2025 lakesidebaptistchurch. All Rights Reserved.</p>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="footer-privacy-policy">
                <ul>
                  <li>
                    <a href="#">term & condition</a>
                  </li>
                  <li>
                    <a href="#">support</a>
                  </li>
                  <li>
                    <a href="#">privacy policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

