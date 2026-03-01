<?php
// backend/security.php

function security_headers(): void
{
    if (headers_sent()) return;

    header('X-Frame-Options: SAMEORIGIN');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: geolocation=(), microphone=(), camera=()');

    // Dev-friendly CSP (Paystack + Google fonts allowed)
    header("Content-Security-Policy: 
        default-src 'self' https: data:;
        script-src 'self' https://js.paystack.co 'unsafe-inline';
        style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
        font-src 'self' https://fonts.gstatic.com data:;
        img-src 'self' data: https:;
        connect-src 'self' https://api.paystack.co;
        frame-src https://checkout.paystack.com https://*.paystack.co;
    ");
}