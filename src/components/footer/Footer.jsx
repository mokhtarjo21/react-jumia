import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* الجزء العلوي */}
      <div className="footer-top">
        <div className="footer-promo">
          <p>هل أنت جديد على جوميا؟</p>
          <span>اشترك في نشرتنا الإخبارية للحصول على أحدث العروض</span>
        </div>

        <div className="footer-subscribe">
          <input type="email" placeholder="example@email.com" />
          <button>اشترك</button>
        </div>
      </div>

      {/* الموافقة على الشروط */}
      <div className="footer-terms">
        <label>
          <input type="checkbox" />
          <span>
            أوافق على سياسة الخصوصية وملفات تعريف الارتباط لدى جوميا.
            <strong> أوافق على الشروط القانونية</strong>
          </span>
        </label>
      </div>

      {/* الجزء السفلي */}
      <div className="footer-bottom">
        <div className="footer-column">
          <h4>تحتاج مساعدة؟</h4>
          <ul>
            <li>تواصل معنا</li>
            <li>مركز المساعدة</li>
            <li>اتصل بنا</li>
            <li><strong>روابط مفيدة:</strong></li>
            <li>كيفية عمل طلب شراء</li>
            <li>طرق الدفع</li>
            <li>سياسة الشحن</li>
            <li>سياسة الاسترجاع</li>
            <li>سياسة الاسترداد</li>
            <li>إرشادات عن المعلومات الخاصة بالدفع</li>
            <li>عروض البلاك فرايداي</li>
            <li>عروض رمضان</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>من نحن</h4>
          <ul>
            <li>انضم إلى جوميا</li>
            <li>الشروط والأحكام</li>
            <li>شروط وأحكام بيع متجر جوميا</li>
            <li>سياسة الخصوصية</li>
            <li>سياسة ملفات تعريف الارتباط</li>
            <li>توصيل مجاني</li>
            <li>فلاش سيل</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>زود مبيعاتك</h4>
          <ul>
            <li>بيع على جوميا</li>
            <li>قاعدة معرفة التاجر (Vendor hub)</li>
            <li>ابدأ رحلتك مع جوميا (J-Force)</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>جوميا دولياً</h4>
          <ul>
            <li>الجزائر</li>
            <li>المغرب</li>
            <li>نيجيريا</li>
            <li>ساحل العاج</li>
            <li>غانا</li>
            <li>كينيا</li>
            <li>السنغال</li>
            <li>أوغندا</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
