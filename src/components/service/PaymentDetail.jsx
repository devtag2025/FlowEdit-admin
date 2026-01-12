import { CreditCard, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "../common/Button";

const PaymentDetail = () => {
  return (
    <>
      <section className="max-w-5xl mx-auto bg-tertiary rounded-2xl md:rounded-3xl p-6 mb-8 text-accent">
        <div className="space-y-6 ">
          <div>
            <h3 className="text-lg font-semibold mb-1">Payment Methods</h3>
            <p className="text-slate-600">
              Manage your credit cards and billing preferences.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between bg-white rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg shadow-lg">
                <CreditCard size={25} className="text-blue-700" />
              </div>

              <div>
                <h3 className="font-medium text-lg mb-1">
                  Visa ending in 4242
                </h3>
                <p className="text-sm text-slate-500">Expires 12/25</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-600 font-medium px-3 py-1 rounded-full bg-slate-100 text-sm">
                Default
              </span>

              <Button className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-slate-300">
                <Trash2 size={18} />
              </Button>
            </div>
          </div>

          <Button className="flex items-center justify-center w-full bg-white text-accent border-2 border-dashed rounded-xl p-4 gap-2 border-slate-300">
            <Plus size={22} className="text-accent" />
            Add New Payment Method
          </Button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto bg-tertiary rounded-3xl p-6 text-accent">
        <div className="flex items-center justify-between bg-tertiary mb-5">
          <div>
            <h3 className="text-lg font-semibold mb-1">Billing Address</h3>
            <p className="text-slate-600">
              This address appears on your monthly invoices.
            </p>
          </div>

          <Button className="flex items-center justify-center  w-10 h-10 border-2 border-slate-300 rounded-lg text-accent">
            <Pencil size={18} />
          </Button>
        </div>

<div className="grid grid-cols-2 md:grid-cols-4 md:bg-white py-4 md:px-6 rounded-2xl font-semibold gap-4 text-accent">
  <div>
    <p className="text-accent mb-1">Company Name</p>
    <p className="text-slate-600 font-medium">Acme Inc.</p>
  </div>

  <div>
    <p className="text-accent mb-1">Billing Email</p>
    <p className="text-slate-600 font-medium">billing@acme.com</p>
  </div>

  <div>
    <p className="text-accent mb-1">Address</p>
    <p className="text-slate-600 font-medium">123 Market Street</p>
  </div>

  <div>
    <p className="text-accent mb-1">City/State</p>
    <p className="text-slate-600 font-medium">San Francisco, CA 94105</p>
  </div>
</div>

      </section>
    </>
  );
};

export default PaymentDetail;
