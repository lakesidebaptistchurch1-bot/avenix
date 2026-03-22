import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";

type ReceiptRow = {
  reference: string;
  amount: number | string;
  currency: string;
  status: string;
  created_at: string;
  donation_id: number | null;
  donor_name?: string | null;
  donor_email?: string | null;
  donor_note?: string | null;
};

function formatDate(value: string): string {
  try {
    const date = new Date(value);
    return date.toLocaleDateString("en-GH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }) + " • " + date.toLocaleTimeString("en-GH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export default async function ThankYouPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await props.searchParams) ?? {};
  const ref = typeof sp.ref === "string" ? sp.ref.trim() : "";

  if (!ref) {
    redirect("/donation");
  }

  let receipt: ReceiptRow | null = null;
  let errorMessage: string | null = null;

  const { data: payment, error: paymentError } = await supabaseAdmin
    .from("payments")
    .select("*")
    .eq("reference", ref)
    .single();

  if (paymentError || !payment) {
    errorMessage = "We couldn’t find this payment record.";
  } else {
    let donor_name: string | null = null;
    let donor_email: string | null = null;
    let donor_note: string | null = null;

    if (payment.donation_id) {
      const { data: don } = await supabaseAdmin
        .from("donations")
        .select("name, email, note")
        .eq("id", payment.donation_id)
        .single();

      if (don) {
        donor_name = don.name;
        donor_email = don.email;
        donor_note = don.note;
      }
    }

    receipt = {
      ...payment,
      donor_name,
      donor_email,
      donor_note,
    } as ReceiptRow;
  }

  const isSuccess = receipt && (receipt.status === "success" || receipt.status === "paid");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-16 px-5">
      <div className="w-full max-w-xl">
        {/* Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
          {/* Top accent bar */}
          <div className={`h-2 w-full ${isSuccess ? "bg-emerald-500" : "bg-rose-500"}`} />

          {/* Content */}
          <div className="px-8 pt-10 pb-12 md:px-12">
            {/* Icon / Emoji header */}
            <div className="text-center mb-8">
              {isSuccess ? (
                <div className="text-6xl mb-4">🙏</div>
              ) : (
                <div className="text-6xl mb-4">😔</div>
              )}
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                {isSuccess ? "Thank You" : "Payment Issue"}
              </h1>
              <p className="mt-3 text-lg text-gray-600 leading-relaxed">
                {isSuccess
                  ? "Your gift is a blessing to Lakeside Baptist Church."
                  : "We couldn’t process or locate your payment."}
              </p>
            </div>

            {/* Status pill */}
            <div className="flex justify-center mb-10">
              <span
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  isSuccess
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-rose-50 text-rose-700 border border-rose-100"
                }`}
              >
                {isSuccess ? "Received with Gratitude" : "Not Found"}
              </span>
            </div>

            {errorMessage || !receipt ? (
              <div className="text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <p className="text-gray-700 text-lg mb-4">{errorMessage}</p>
                <p className="text-gray-500">
                  Reference: <span className="font-medium break-all">{ref}</span>
                </p>
                <p className="mt-6 text-gray-600">
                  Please contact the church if this seems incorrect.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                {/* Payment */}
                <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                  <h2 className="text-xl font-serif font-semibold text-gray-900 mb-5">
                    Payment Summary
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between items-center">
                      <span>Reference</span>
                      <span className="font-medium text-gray-900 font-mono text-sm break-all">
                        {receipt.reference}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Amount</span>
                      <span className="text-2xl font-bold text-emerald-700">
                        {receipt.currency} {Number(receipt.amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Date</span>
                      <span className="text-gray-900">{formatDate(receipt.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Donor */}
                {(receipt.donor_name || receipt.donor_email || receipt.donor_note) && (
                  <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                    <h2 className="text-xl font-serif font-semibold text-gray-900 mb-5">
                      Your Gift Details
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      {receipt.donor_name && (
                        <div className="flex justify-between">
                          <span>Name</span>
                          <span className="text-gray-900">{receipt.donor_name}</span>
                        </div>
                      )}
                      {receipt.donor_email && (
                        <div className="flex justify-between">
                          <span>Email</span>
                          <span className="text-gray-900 break-all">{receipt.donor_email}</span>
                        </div>
                      )}
                      {receipt.donor_note && (
                        <div className="pt-2">
                          <span className="block font-medium text-gray-800 mb-1">Note / Dedication</span>
                          <p className="text-gray-600 italic leading-relaxed">
                            “{receipt.donor_note}”
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donation"
                className="inline-flex items-center justify-center px-10 py-4 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition shadow-sm"
              >
                Give Again
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-800 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition shadow-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          Lakeside Baptist Church • Thank you for your kindness
        </p>
      </div>
    </div>
  );
}