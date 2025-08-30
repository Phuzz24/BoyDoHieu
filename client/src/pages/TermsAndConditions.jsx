import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-luxuryGold text-center">Điều khoản và Chính sách</h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-luxuryBlack dark:text-white mb-2">1. Điều khoản sử dụng</h2>
          <p>
            Khi sử dụng website của chúng tôi, bạn đồng ý không sử dụng dịch vụ vào mục đích trái pháp luật hoặc vi phạm quyền lợi của người khác. Chúng tôi có quyền từ chối phục vụ bất kỳ ai vì bất kỳ lý do gì.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-luxuryBlack dark:text-white mb-2">2. Chính sách bảo mật</h2>
          <p>
            Mọi thông tin cá nhân bạn cung cấp sẽ được chúng tôi bảo mật tuyệt đối và chỉ sử dụng cho mục đích xử lý đơn hàng, chăm sóc khách hàng và cải thiện trải nghiệm người dùng.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-luxuryBlack dark:text-white mb-2">3. Giao dịch và thanh toán</h2>
          <p>
            Chúng tôi chấp nhận nhiều hình thức thanh toán an toàn. Mọi giao dịch đều được xử lý qua cổng thanh toán được mã hóa và bảo vệ.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-luxuryBlack dark:text-white mb-2">4. Chính sách hoàn tiền</h2>
          <p>
            Khách hàng có thể yêu cầu hoàn tiền trong vòng 3 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi do nhà sản xuất hoặc sai mô tả. Vui lòng liên hệ bộ phận hỗ trợ để được hướng dẫn chi tiết.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-luxuryBlack dark:text-white mb-2">5. Thay đổi điều khoản</h2>
          <p>
            Chúng tôi có quyền cập nhật hoặc thay đổi các điều khoản mà không cần thông báo trước. Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
          </p>
        </section>

        <p className="text-center mt-8">
          <Link
            to="/register"
            className="inline-block bg-luxuryGold text-luxuryBlack px-6 py-2 rounded-full font-semibold hover:bg-luxuryBlack hover:text-white transition"
          >
            Quay lại đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
