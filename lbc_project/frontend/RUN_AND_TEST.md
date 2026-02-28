# Run Backend & Test Guide

Brief steps to run the PHP backend and test the donation form, login/signup, and payment section.

---

## 1. Prerequisites

- **PHP** 7.4+ (with `pdo_mysql`, `curl`, `json`).
- **MySQL** running (e.g. XAMPP, WAMP, or standalone MySQL).
- Terminal in the project root: `avenix`.

---

## 2. Environment & Database

1. **Copy env (if you don’t have `.env` yet)**  
   From project root:
   ```bash
   cp .env.example .env
   ```
2. **Edit `.env`**  
   Set at least:
   - `BASE_URL=http://localhost:8000` (match the URL you’ll use in step 4).
   - `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` for your MySQL.
   - Optional: `PAYSTACK_SECRET_KEY` (and later a public key for Paystack popup).
3. **Create database tables**  
   Either let the app create the DB (if `DB_AUTO_CREATE=true`) on first request, or run the schema once:
   ```bash
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS avenix CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   mysql -u root -p avenix < backend/schema.sql
   ```
   Use your actual DB name and user from `.env` if different.

---

## 3. Run the backend (PHP built‑in server)

From the **project root** (`avenix`):

```bash
php -S localhost:8000
```

Leave this running. You should see something like:
`Development Server (http://localhost:8000) started.`

- Site URL: **http://localhost:8000**
- Donation form: **http://localhost:8000/donation.html**
- Login: **http://localhost:8000/login.php**
- Sign up: **http://localhost:8000/signup.php**
- Payment (after donation): **http://localhost:8000/payment.php**

---

## 4. Test flow (brief)

### A. Donation form (donation input)

1. Open **http://localhost:8000/donation.html**.
2. Choose an amount:
   - Click a preset (e.g. GH 100) **or** enter a number in “Enter custom amount”.
3. Fill **First name**, **Last name**, **Email** (all required).
4. Optionally add a **Donation note**.
5. Click **“continue to payment”**.
6. **Expected:**  
   - If not logged in → redirect to **login.php** (with message to sign in).  
   - If logged in → redirect to **payment.php** with the chosen amount.

If validation fails (e.g. missing name, invalid email, or no amount), you are redirected back to the donation page and the error message is shown above the submit button.

---

### B. Sign up & login (needed before payment)

1. **Sign up:**  
   - Go to **http://localhost:8000/signup.php**.  
   - Enter name, email, password (8–12 chars, upper, lower, number, special).  
   - Submit → you should be redirected (e.g. to payment if you came from donation).
2. **Login:**  
   - Go to **http://localhost:8000/login.php**.  
   - Enter email and password → redirect to payment or home.

After login, run the donation form again; you should go straight to **payment.php**.

---

### C. Payment section

1. Land on **payment.php** with an amount (from the donation form).
2. **Mobile Money (simulated)**  
   - Select **Mobile Money**.  
   - Choose network (e.g. MTN), enter **10‑digit phone** (e.g. `0501234567`), **Full name**, **Amount** (pre-filled).  
   - Click **“Complete Donation”**.  
   - **Expected:** Success message (simulated); modal then redirect to donation page.
3. **Card (simulated)**  
   - Select **Mastercard / Visa / Virtual Card**.  
   - Enter **Card number** (16 digits), **MM/YY**, **CVV**, **Cardholder name**, **Email**.  
   - Click **“Complete Donation”**.  
   - **Expected:** Success message (simulated); modal then redirect.
4. **Paystack (real API)**  
   - Select **Paystack**.  
   - Fill **Full name**, **Email**, **Phone**, **Amount**.  
   - Click **“Proceed to Paystack”** (opens Paystack popup).  
   - **Note:** Paystack will only work if you set `PAYSTACK_SECRET_KEY` in `.env` and use a **Paystack public key** on the payment page (replace the placeholder `pk_test_...` in `payment.php` with your Paystack public key).  
   - After paying on Paystack, the page sends the reference to `backend/process_payment.php` for verification; success modal then redirect.

---

## 5. Contact form (input form)

- **contact.html** has a contact form; it currently uses `action="#"`, so it does **not** send to the backend.
- To test “input” behaviour, use the **donation form** (above) and the **payment form** (Mobile Money / Card / Paystack) as the main flows.
- To wire the contact form to the backend later, add a PHP script (e.g. `backend/contact_submit.php`) and set the form `action` to that script.

---

## 6. Quick checklist

| Step | Action |
|------|--------|
| 1 | `.env` present and `BASE_URL`, DB_* set |
| 2 | MySQL running; DB created; `backend/schema.sql` applied (or auto-create on first load) |
| 3 | `php -S localhost:8000` from project root |
| 4 | Open donation page → fill amount + name + email → continue to payment |
| 5 | Sign up or log in if redirected to login |
| 6 | On payment page, test Mobile Money then Card (simulated), then Paystack if keys are set |

---

## 7. Troubleshooting

- **“Call to undefined function db()” or DB errors on donation submit**  
  - Ensure `backend/initiate_donation.php` has `require_once __DIR__ . '/config.php';` and that `.env` (or `backend/.env`) is loaded; DB credentials in `.env` must be correct.

- **Redirect goes to wrong URL (e.g. /login.php not localhost:8000)**  
  - Set `BASE_URL=http://localhost:8000` in `.env` (no trailing slash).

- **Paystack “Payment verification failed”**  
  - Set `PAYSTACK_SECRET_KEY` in `.env`.  
  - In `payment.php`, replace the placeholder Paystack public key with your Paystack **public** key so the popup uses your Paystack account.

- **Contact form does nothing**  
  - By design it has no backend yet; use donation + payment for testing.
