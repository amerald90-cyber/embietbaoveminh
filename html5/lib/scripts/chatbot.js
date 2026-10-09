(function() {
    // Ngăn chặn khởi tạo trùng lặp
    if (window.__drugPreventionChatbotLoaded) return;
    window.__drugPreventionChatbotLoaded = true;

    const ASSISTANT_NAME = "Trợ lý AI Tuyên truyền phòng chống ma túy";

    // Âm thanh thông báo "Ting Teng" nhẹ nhàng bằng Web Audio API
    function playTingSound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = 'sine';
            osc2.type = 'sine';

            // Nốt E6 & B6 tạo tiếng Teng nhẹ nhàng, hiện đại
            osc1.frequency.setValueAtTime(1318.51, ctx.currentTime); 
            osc2.frequency.setValueAtTime(1975.53, ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(ctx.currentTime);
            osc1.stop(ctx.currentTime + 0.25);
            osc2.start(ctx.currentTime + 0.08);
            osc2.stop(ctx.currentTime + 0.45);
        } catch (e) {}
    }

    // CƠ SỞ DỮ LIỆU TRI THỨC (KB) - LUẬT 2025, TÀI LIỆU TUYÊN TRUYỀN & TÌNH HUỐNG
    const KB = [
        {
            id: "greeting",
            keywords: ['chào', 'xin chào', 'hi', 'hello', 'bắt đầu', 'là ai', 'tên là gì', 'ai đấy', 'trợ lý'],
            response: "Chào bạn! Tôi là Trợ lý AI chuyên trách về kiến thức Phòng chống Ma túy và Luật pháp. Tôi đã được cập nhật đầy đủ kiến thức về Luật 2025, các tình huống phòng tránh ma túy và hướng dẫn học tập. Bạn cần tôi hỗ trợ thông tin gì?"
        },
{
            id: "warm_greeting",
            keywords: ['chào bạn', 'xin chào bạn', 'hello bot', 'bạn có thể giúp mình không', 'giúp mình với', 'giúp đỡ tôi', 'bạn làm được gì', 'hỏi tí', 'tro ly oi'],
            response: "Chào bạn! Rất vui được gặp bạn. Tôi là Trợ lý AI chuyên trách về Phòng chống Ma túy. \n\nTôi luôn sẵn sàng ở đây để: \n- Giải đáp về **Luật 2025** mới nhất. \n- Hướng dẫn bạn **cách vào học** E-learning. \n- Trang bị **Lá chắn 4 bước** và **Quy tắc 5 KHÔNG** để bạn luôn an toàn. \n- Lắng nghe và gỡ rối những tình huống khó xử mà bạn gặp phải. \n\nBạn đang quan tâm đến nội dung nào? Cứ thoải mái hỏi, tôi sẽ giúp bạn hết mình!"
        },
        {
            id: "definition",
            keywords: ['ma túy là gì', 'khái niệm', 'định nghĩa', 'ma tuy la gi', 'thế nào là ma túy', 'định nghĩa ma tuý'],
            response: "Theo **Luật số 120/2025/QH15**, ma túy là chất gây nghiện, chất hướng thần được quy định trong danh mục do Chính phủ ban hành. \n\nNói cách khác, đó là các thực thể hóa học làm biến đổi chức năng sinh học và cấu trúc cơ thể, làm thay đổi trạng thái ý thức và tâm sinh lý. Nếu lạm dụng sẽ gây lệ thuộc (nghiện), tổn thương sức khỏe nghiêm trọng."
        },
        {
            id: "categories",
            keywords: ['mấy loại', 'có những loại nào', 'phân loại', 'danh sách ma túy', 'loại ma túy', 'nhóm ma túy', 'kể tên các loại'],
            response: "Dựa trên tài liệu tuyên truyền, ma túy được chia thành các nhóm chính sau:\n\n1. **Nguồn gốc tự nhiên**: Thuốc phiện, Cần sa, Nấm ảo giác.\n2. **Ma túy tổng hợp**: Ma túy đá (Meth), Thuốc lắc (Ecstasy), Ketamine, Hồng phiến.\n3. **Ma túy gây ảo giác mạnh**: LSD (Bùa lưỡi), Cỏ Mỹ.\n4. **Ma túy trá hình/núp bóng**: 'Trà sữa' (dạng bột), 'Nước vui' (dạng lỏng), bánh lười, kẹo dẻo cần sa.\n5. **Khác**: Thuốc lá điện tử tẩm ma túy, 'Bóng cười' (khí N2O), GHB (Nước biển)."
        },
        {
            id: "law_2025",
            keywords: ['luật 2025', 'luật mới', '120/2025', 'quy định pháp luật', 'luật phòng chống ma túy', 'luật hiện hành', 'hiệu lực', 'áp dụng từ bao giờ', 'ban hành', 'ai ký', 'trần thanh mẫn', 'ngày nào'],
            response: "**Thông tin về Luật mới nhất:**\n- **Số hiệu**: Luật Phòng, chống ma túy số **120/2025/QH15**.\n- **Ban hành**: Được Quốc hội thông qua ngày 10/12/2025, do Chủ tịch Quốc hội **Trần Thanh Mẫn** ký.\n- **Hiệu lực**: Chính thức áp dụng từ ngày **01/07/2026**.\n- **Nội dung chính**: Quản lý chặt người sử dụng trái phép (Điều 24), cai nghiện bắt buộc cho người từ 12-18 tuổi (Điều 36) và ưu tiên nguồn lực bảo vệ học đường."
        },
        {
            id: "forbidden_acts",
            keywords: ['hành vi bị cấm', 'điều 5', 'bị cấm theo luật', 'nghiêm cấm', 'd5', 'cấm cái gì', 'hành vi cấm'],
            response: "Theo **Điều 5 Luật 2025**, các hành vi bị nghiêm cấm bao gồm:\n- Trồng cây chứa chất ma túy.\n- Sản xuất, tàng trữ, vận chuyển, mua bán trái phép.\n- Chiếm đoạt chất ma túy, tiền chất.\n- Sử dụng, tổ chức sử dụng trái phép chất ma túy.\n- Cưỡng bức, lôi kéo người khác sử dụng.\n- Sản xuất, mua bán dụng cụ dùng vào việc sử dụng ma túy (như bình hút, kim tiêm trái phép).\n- Kỳ thị người sử dụng hoặc người cai nghiện."
        },
        {
            id: "health_harm",
            keywords: ['tác hại', '6 hệ cơ quan', 'suc khoe', 'hệ thần kinh', 'tim mạch', 'tiêu hóa', 'hô hấp', 'gan thận', 'hại sức khỏe'],
            response: "Ma túy tàn phá trực tiếp **6 hệ cơ quan** quan trọng:\n1. **Tiêu hóa**: Gây chán ăn, buồn nôn, đau bụng.\n2. **Tuần hoàn**: Loạn nhịp tim, xơ cứng mạch máu, tăng/giảm huyết áp đột ngột.\n3. **Hô hấp**: Viêm đường hô hấp, suy hô hấp cấp.\n4. **Da**: Rối loạn cảm giác da, lở loét (do lười vệ sinh hoặc ảo giác).\n5. **Gan & Thận**: Suy giảm chức năng thải độc, dẫn tới suy thận mạn.\n6. **Thần kinh**: Tác động trung ương não bộ, gây hoang tưởng, ngáo đá, mất trí nhớ."
        },
        {
            id: "causes",
            keywords: ['nguyên nhân', 'tại sao nghiện', 'vì sao nghiện', 'ly do nghiện', 'tại sao bị lôi kéo'],
            response: "Nguyên nhân dẫn đến nghiện ma túy gồm:\n- **Tự bản thân**: Tò mò thử cho biết, thiếu hiểu biết, bế tắc cuộc sống, thích thể hiện 'ngầu'.\n- **Gia đình**: Bố mẹ buông lỏng quản lý, nuông chiều thái quá, mâu thuẫn gia đình.\n- **Bạn bè & Xã hội**: Bị rủ rê tại quán bar, tiệc sinh nhật, thiếu sân chơi lành mạnh cho giới trẻ."
        },
        {
            id: "signs",
            keywords: ['dấu hiệu', 'nhận biết người nghiện', 'nguoi nghien ma tuy', 'biểu hiện nghiện', 'nhận ra người nghiện'],
            response: "Các dấu hiệu phổ biến của người nghiện:\n- **Giờ giấc**: Thức khuya, dậy muộn, hay đi ra ngoài đúng vào một giờ nhất định.\n- **Tâm lý**: Thích ở một mình, ngại tiếp xúc người thân, hay nói dối.\n- **Tài chính**: Nhu cầu tiêu tiền tăng đột biến, trộm cắp, nợ nần.\n- **Đồ vật lạ**: Giấy bạc, bật lửa, bơm kim tiêm, **bình nhựa hình hồ lô kèm ống hút**.\n- **Sức khỏe**: Da tái, môi thâm, mắt lờ đờ, ngáp vặt nhiều."
        },
        {
            id: "pink_pill",
            keywords: ['hồng phiến', 'amphetamine', 'ngựa hồng', 'viên nén hồng'],
            response: "**Hồng phiến (Amphetamine):**\n- **Nhận biết**: Dạng viên nén màu hồng, xanh hoặc dạng kẹo. Tác dụng kích thích hưng phấn giả tạo.\n- **Tác hại**: Gây tim đập nhanh, huyết áp tăng cao. Dùng lâu ngày gây mất ngủ, tinh thần **hung dữ, hoang tưởng**, co giật và tử vong do quá liều."
        },
        {
            id: "ketamine",
            keywords: ['ketamine', 'ke', 'khay', 'bột trắng'],
            response: "**Ketamine:**\n- **Nhận biết**: Dạng bột trắng. Đây vốn là thuốc gây mê dùng trong y tế nhưng bị lạm dụng để tạo ảo giác.\n- **Tác hại**: Gây tăng huyết áp, mạch đập nhanh, co thắt thanh quản, suy hô hấp và đặc biệt dẫn đến **suy thận nghiêm trọng**."
        },
        {
            id: "synthetic_grass",
            keywords: ['cỏ mỹ', 'thảo mộc vụn', 'nhựa cháy', 'cỏ khô'],
            response: "**Cỏ Mỹ:**\n- **Nhận biết**: Là hỗn hợp thực vật vụn tẩm hóa chất độc hại. Có mùi hơi khét như nhựa cháy.\n- **Tác hại**: Gây ảo giác mạnh, khiến người dùng **vô lý, bạo lực**, ảo thị. Gây nôn mửa, tim đập nhanh, động kinh và tử vong đột ngột."
        },
        {
            id: "lsd_tongue",
            keywords: ['lsd', 'bùa lưỡi', 'tem giấy', 'kẹo dán', 'hình dán hoạt hình'],
            response: "**LSD (Bùa lưỡi):**\n- **Nhận biết**: Mảnh giấy nhỏ (**1,5cm x 1,5cm**) in hình hoạt hình sặc sỡ. \n- **Cách dùng**: Ngậm trực tiếp dưới lưỡi.\n- **Tác hại**: Gây ảo giác cực mạnh suốt 3 giờ, làm mất kiểm soát hành vi hoàn toàn, nguy cơ tử vong cao do sốc hoặc tai nạn khi bị ảo giác."
        },
        {
            id: "milk_tea",
            keywords: ['trà sữa', 'ma túy trà sữa', 'túi bột sữa'],
            response: "**Ma túy Trà sữa:**\n- **Nhận biết**: Dạng bột, mùi sữa, đóng túi nilon in chữ nước ngoài bắt mắt. \n- **Cách dùng**: Pha chung với nước tăng lực hoặc Coca-cola.\n- **Tác hại**: Chứa ma túy đá trộn hương liệu. Gây nghiện cực nặng, loạn thần, phá hủy hệ thần kinh tương tự ma túy đá."
        },
        {
            id: "happy_water",
            keywords: ['nước vui', 'nuoc vui', 'lọ lỏng'],
            response: "**Ma túy Nước vui:**\n- **Nhận biết**: Dạng lỏng, đựng trong lọ nhỏ **10-15ml**, xuất xứ thường từ Trung Quốc.\n- **Tác hại**: Chứa Meth và Ketamine. Đặc biệt nguy hiểm khi kết hợp nhạc mạnh làm thân nhiệt tăng cao cực điểm, dẫn tới suy hô hấp, loạn nhịp tim và tử vong."
        },
        {
            id: "stranger_candy",
            keywords: ['người lạ cho đồ', 'cho kẹo', 'nước ngọt', 'cổng trường', 'ăn kẹo', 'nhận đồ', 'cho nước'],
            response: "**Tình huống người lạ cho kẹo/nước/đồ ăn:** Tuyệt đối **KHÔNG** nhận. Ma túy mới có thể giả dạng kẹo dẻo, kẹo mút hoặc nước ngọt để lừa học sinh. Hãy từ chối khéo: 'Bố mẹ dặn cháu không nhận đồ người lạ' và rời đi ngay."
        },
        {
            id: "carry_bag",
            keywords: ['cầm hộ', 'xách hộ', 'gửi đồ', 'túi quà', 'ship hộ', 'giữ túi'],
            response: "**Tình huống nhờ cầm hộ đồ:** Tuyệt đối **KHÔNG** xách hộ túi, quà của người lạ hoặc bạn quen khi không biết bên trong là gì. Bạn có thể vô tình trở thành người vận chuyển ma túy và bị cảnh sát bắt đấy!"
        },
        {
            id: "social_media",
            keywords: ['mạng xã hội', 'facebook', 'tiktok', 'the game', 'nạp thẻ', 'lừa online', 'thẻ game'],
            response: "**Cạm bẫy trên mạng:** Kẻ xấu giả làm bạn cùng lứa trên mạng tặng thẻ game, quà để rủ đi gặp mặt. Đừng bao giờ cung cấp địa chỉ nhà hay đi gặp người lạ một mình. Đó là bẫy lôi kéo sử dụng ma túy!"
        },
        {
            id: "emergency",
            keywords: ['111', '113', '114', '115', '112', 'số điện thoại', 'cứu giúp', 'gọi ai', 'tong dai'],
            response: "**Danh bạ khẩn cấp (Miễn phí):**\n- **111**: Bảo vệ trẻ em (Bạo hành, xâm hại).\n- **113**: Công an (Tố giác ma túy, an ninh).\n- **114**: Cháy nổ, cứu nạn.\n- **115**: Cấp cứu y tế.\n- **112**: Cứu nạn thiên tai.\n*Lưu ý: Gọi báo tin giả sẽ bị phạt từ 2-3 triệu đồng (Nghị định 144).*"
        },
{
            id: "law_number",
            keywords: ['luật số bao nhiêu', 'số hiệu luật', 'luật gì', 'luat moi nhat', '120/2025'],
            response: "Thông tin cho bạn: Đây là **Luật Phòng, chống ma túy số 120/2025/QH15**."
        },
        {
            id: "law_date",
            keywords: ['ngày ban hành', 'thông qua ngày nào', 'ai ký', 'trần thanh mẫn'],
            response: "Luật này được Quốc hội khóa XV, kỳ họp thứ 10 thông qua ngày **10 tháng 12 năm 2025**, do Chủ tịch Quốc hội **Trần Thanh Mẫn** ký ban hành."
        },
        {
            id: "law_effect",
            keywords: ['hiệu lực', 'khi nào có hiệu lực', 'áp dụng từ bao giờ', 'hiệu lực từ ngày'],
            response: "Bạn lưu ý nhé: Luật Phòng, chống ma túy 2025 chính thức có hiệu lực thi hành từ ngày **01 tháng 7 năm 2026** (Theo Điều 55)."
        },
        {
            id: "law_replace",
            keywords: ['thay thế luật nào', 'luật cũ còn dùng không', 'luật 2021 còn dùng không'],
            response: "Khi Luật 2025 có hiệu lực (01/07/2026), Luật Phòng, chống ma túy số **73/2021/QH14** và các sửa đổi bổ sung trước đó sẽ hết hiệu lực."
        },
        {
            id: "art_2",
            keywords: ['điều 2', 'd2', 'giải thích từ ngữ', 'định nghĩa ma túy theo luật'],
            response: "**Điều 2 - Giải thích từ ngữ:**\n- **Chất ma túy**: Là chất gây nghiện, chất hướng thần được quy định trong danh mục do Chính phủ ban hành.\n- **Tiền chất**: Là hóa chất sử dụng trong quá trình điều chế, sản xuất chất ma túy.\n- **Cây có chứa chất ma túy**: Cây thuốc phiện, côca, cần sa và các loại cây khác do Chính phủ quy định."
        },
        {
            id: "addict_def",
            keywords: ['người nghiện ma túy là gì', 'nghiện là gì', 'thế nào là người nghiện'],
            response: "Theo khoản 11 Điều 2: **Người nghiện ma túy** là người sử dụng chất ma túy, thuốc gây nghiện, thuốc hướng thần và bị lệ thuộc vào các chất này."
        },
        {
            id: "detox_def",
            keywords: ['cai nghiện là gì', 'định nghĩa cai nghiện'],
            response: "Theo khoản 12 Điều 2: **Cai nghiện ma túy** là quá trình hỗ trợ y tế, tâm lý, xã hội giúp người nghiện dừng sử dụng, phục hồi thể chất, tinh thần và thay đổi hành vi để chấm dứt việc sử dụng trái phép."
        },
        {
            id: "art_5",
            keywords: ['điều 5', 'd5', 'hành vi bị nghiêm cấm', 'cấm cái gì', 'bị cấm'],
            response: "**Điều 5 - Các hành vi bị nghiêm cấm:**\n1. Trồng cây chứa ma túy, hướng dẫn trồng.\n2. Sản xuất, tàng trữ, vận chuyển, mua bán trái phép.\n3. Chiếm đoạt chất ma túy, tiền chất.\n4. Sử dụng, tổ chức sử dụng trái phép chất ma túy.\n5. Cưỡng bức, lôi kéo người khác sử dụng.\n6. Kỳ thị người sử dụng ma túy.\n7. Quảng cáo, tiếp thị chất ma túy."
        },
        {
            id: "art_6",
            keywords: ['điều 6', 'd6', 'trách nhiệm gia đình', 'cá nhân phải làm gì'],
            response: "**Điều 6 - Trách nhiệm cá nhân, gia đình:**\n- Tuyên truyền, giáo dục thành viên về tác hại của ma túy.\n- Quản lý, ngăn chặn người thân vi phạm pháp luật ma túy.\n- Cung cấp kịp thời thông tin về tội phạm ma túy cho Công an hoặc cơ quan có thẩm quyền."
        },
        {
            id: "art_8",
            keywords: ['điều 8', 'd8', 'trách nhiệm học sinh', 'nhà trường làm gì'],
            response: "**Điều 8 - Trách nhiệm cơ sở giáo dục:**\n- Tổ chức giáo dục phòng chống ma túy cho học sinh, sinh viên.\n- Quản lý chặt chẽ, ngăn chặn học sinh vi phạm pháp luật ma túy.\n- Phối hợp xét nghiệm chất ma túy trong cơ thể khi cần thiết để phát hiện học sinh sử dụng trái phép."
        },
        {
            id: "art_12",
            keywords: ['điều 12', 'd12', 'giám sát điện tử'],
            response: "**Điều 12 - Giám sát điện tử:** Là biện pháp sử dụng thiết bị điện tử để quản lý người đang cai nghiện tại gia đình, cộng đồng; người điều trị thuốc thay thế hoặc người đang bị quản lý sau cai nghiện."
        },
        {
            id: "art_23",
            keywords: ['điều 23', 'd23', 'xét nghiệm chất ma túy', 'ai bị xét nghiệm'],
            response: "**Điều 23 - Xét nghiệm chất ma túy trong cơ thể:** Thực hiện với người bị phát hiện sử dụng trái phép, người có căn cứ cho rằng đã sử dụng, người đang cai nghiện hoặc đang quản lý sau cai."
        },
        {
            id: "test_enforce",
            keywords: ['không chấp hành xét nghiệm', 'áp giải xét nghiệm', 'cưỡng chế xét nghiệm'],
            response: "Theo Điều 23: Nếu người bị yêu cầu xét nghiệm không chấp hành, cơ quan có thẩm quyền có quyền **áp giải** người đó đến địa điểm xét nghiệm để thực hiện."
        },
        {
            id: "art_24",
            keywords: ['điều 24', 'd24', 'quản lý người sử dụng', 'thời gian quản lý'],
            response: "**Điều 24 - Quản lý người sử dụng trái phép:**\n- Thời hạn quản lý là **01 năm** kể từ ngày có quyết định.\n- Đây là biện pháp phòng ngừa, giúp người đó không tiếp tục sử dụng, không phải là biện pháp xử lý hành chính."
        },
        {
            id: "art_25",
            keywords: ['điều 25', 'd25', 'người sử dụng có trách nhiệm gì'],
            response: "**Điều 25 - Trách nhiệm của người sử dụng:**\n- Cung cấp đầy đủ, chính xác thông tin về hành vi của mình.\n- Có mặt theo giấy triệu tập của Công an/UBND cấp xã.\n- Cam kết chấp hành nghiêm chỉnh pháp luật."
        },
        {
            id: "art_28",
            keywords: ['điều 28', 'd28', 'cơ sở cai nghiện'],
            response: "**Điều 28 - Cơ sở cai nghiện ma túy:**\n- **Công lập**: Cho người từ 18 tuổi trở lên; hoặc từ 12 đến dưới 18 tuổi đủ điều kiện.\n- **Tư nhân**: Thực hiện cai nghiện cho người từ đủ 12 tuổi trở lên."
        },
        {
            id: "art_29",
            keywords: ['điều 29', 'd29', 'thời hạn cai nghiện', 'quy trình cai'],
            response: "**Điều 29 - Thời hạn và Quy trình:**\n- Cai nghiện lần đầu: **24 tháng**.\n- Cai nghiện từ lần thứ hai trở lên: **36 tháng**.\n- Quy trình gồm 5 giai đoạn: Tiếp nhận -> Điều trị cắt cơn -> Giáo dục/Phục hồi -> Lao động/Học nghề -> Chuẩn bị tái hòa nhập."
        },
        {
            id: "art_30",
            keywords: ['điều 30', 'd30', 'hình thức cai nghiện'],
            response: "**Điều 30 - Các hình thức cai nghiện:**\n1. Cai nghiện tự nguyện (tại gia đình, cộng đồng hoặc cơ sở cai nghiện).\n2. Cai nghiện bắt buộc (tại cơ sở công lập hoặc trường giáo dưỡng)."
        },
        {
            id: "art_35",
            keywords: ['điều 35', 'd35', 'cai nghiện bắt buộc 18 tuổi', 'người lớn cai nghiện'],
            response: "**Điều 35 - Cai nghiện bắt buộc cho người từ 18 tuổi:** Áp dụng khi không đăng ký cai tự nguyện, tự ý chấm dứt cai tự nguyện, tái nghiện trong thời gian cai tự nguyện hoặc vi phạm quy định điều trị thuốc thay thế."
        },
        {
            id: "art_36",
            keywords: ['điều 36', 'd36', 'cai nghiện bắt buộc 12 đến 18 tuổi', 'dưới 18 tuổi bị cai nghiện'],
            response: "**Điều 36 - Cai nghiện bắt buộc cho người từ đủ 12 đến dưới 18 tuổi:**\n- Đây không phải là biện pháp xử lý hành chính.\n- Thực hiện tại trường giáo dưỡng hoặc cơ sở công lập phù hợp.\n- Áp dụng khi không đăng ký cai tự nguyện hoặc tái nghiện trong thời gian cai tự nguyện."
        },
        {
            id: "art_42",
            keywords: ['điều 42', 'd42', 'hỗ trợ sau cai nghiện', 'quản lý sau cai'],
            response: "**Điều 42 - Quản lý sau cai nghiện:**\n- Thời hạn **01 năm** đối với người cai tự nguyện/thuốc thay thế.\n- Thời hạn **02 năm** đối với người cai nghiện bắt buộc.\n- Hỗ trợ: học văn hóa (cho người 12-18 tuổi), học nghề, vay vốn và tìm việc làm."
        },
        {
            id: "art_47",
            keywords: ['điều 47', 'd47', 'vi phạm nghĩa vụ cai nghiện'],
            response: "**Điều 47 - Xử lý vi phạm:** Nếu không chấp hành giám sát điện tử hoặc tiếp tục vi phạm pháp luật trong thời gian cai tự nguyện, bạn sẽ bị áp dụng biện pháp đưa đi cai nghiện bắt buộc."
        },
        {
            id: "art_1",
            keywords: ['điều 1', 'd1', 'phạm vi điều chỉnh'],
            response: "**Điều 1:** Luật này quy định về phòng chống ma túy, quản lý người sử dụng, cai nghiện, trách nhiệm cá nhân/gia đình/tổ chức, quản lý nhà nước và hợp tác quốc tế."
        },
        {
            id: "art_3",
            keywords: ['điều 3', 'd3', 'chính sách nhà nước'],
            response: "**Điều 3:** Nhà nước thực hiện đồng bộ các biện pháp phòng chống ma túy; ưu tiên nguồn lực cho vùng biên giới, hải đảo, vùng đồng bào dân tộc thiểu số và học đường."
        },
        {
            id: "art_4",
            keywords: ['điều 4', 'd4', 'kinh phí', 'tiền đâu cai nghiện'],
            response: "**Điều 4 - Nguồn tài chính:** Gồm ngân sách nhà nước; nguồn tài trợ/viện trợ; chi trả của chính người nghiện hoặc gia đình họ và các nguồn hợp pháp khác."
        },
        {
            id: "forbidden_stigma",
            keywords: ['kỳ thị', 'biểu hiện kỳ thị', 'cấm kỳ thị'],
            response: "**Khoản 11 Điều 5:** Luật nghiêm cấm mọi hành vi kỳ thị người sử dụng trái phép chất ma túy, người đang cai nghiện hoặc người sau cai nghiện."
        },
        {
            id: "art_54",
            keywords: ['điều 54', 'd54', 'xử lý hành chính'],
            response: "**Điều 54:** Quy định việc sửa đổi, bổ sung một số điều của Luật Xử lý vi phạm hành chính để đảm bảo tính thống nhất với các quy định về cai nghiện bắt buộc trong Luật này."
        },
        {
            id: "art_56",
            keywords: ['điều 56', 'd56', 'chuyển tiếp', 'đang cai nghiện thì sao'],
            response: "**Điều 56 - Điều khoản chuyển tiếp:** Người đang thực hiện cai nghiện trước ngày 01/07/2026 thì tiếp tục thực hiện theo quy định cũ cho đến hết thời hạn, nhưng sau đó sẽ bị quản lý sau cai theo luật mới."
        },
        {
            id: "help_111",
            keywords: ['tổng đài bảo vệ trẻ em', '111', 'tong dai 111'],
            response: "Mặc dù không nằm riêng trong 1 điều của Luật này, bạn hãy nhớ số **111** là Tổng đài Quốc gia bảo vệ trẻ em để báo cáo xâm hại và **113** để báo tin tội phạm ma túy."
        },
        {
            id: "signer_mẫn",
            keywords: ['trần thanh mẫn', 'ai ban hành luật', 'chủ tịch quốc hội'],
            response: "Người ký ban hành Luật Phòng, chống ma túy 2025 là Chủ tịch Quốc hội **Trần Thanh Mẫn**."
        },
     {
            id: "total_categories",
            keywords: ['có bao nhiêu loại', 'tổng cộng mấy loại', 'kể tên các nhóm', 'có mấy nhóm', 'phan loai ma tuy'],
            response: "**Câu hỏi: Có bao nhiêu loại ma túy tất cả?**\n\n**Trả lời**: Thực tế có hàng trăm loại khác nhau, nhưng tài liệu của chúng mình chia làm 4 nhóm chính để bạn dễ nhớ:\n1. **Nhóm tự nhiên**: Thuốc phiện, cần sa.\n2. **Nhóm tổng hợp**: Ma túy đá, thuốc lắc, Ketamine.\n3. **Nhóm gây ảo giác**: Cỏ Mỹ, Bùa lưỡi (LSD).\n4. **Nhóm trá hình**: Núp bóng trong trà sữa, nước vui, bánh kẹo hoặc thuốc lá điện tử.\n=> Loại nào cũng cực kỳ độc hại bạn nhé!"
        },
        {
            id: "most_dangerous",
            keywords: ['loại nào hại nhất', 'nguy hiểm nhất', 'độc nhất', 'sợ nhất', 'loai nao hai nhat'],
            response: "**Câu hỏi: Loại ma túy nào là nguy hiểm nhất?**\n\n**Trả lời**: Tất cả đều nguy hiểm, nhưng **Ma túy tổng hợp (như ma túy đá)** và **Ma túy trá hình** thường đáng sợ nhất. Ma túy đá tàn phá não bộ cực nhanh gây ngáo đá, còn ma túy trá hình thì cực kỳ khó nhận biết vì nó 'ẩn mình' dưới dạng kẹo, nước ngọt để lừa học sinh."
        },
        {
            id: "current_law_status",
            keywords: ['luật nào đang dùng', 'luật hiện hành', 'luật 2021 hay 2025', 'khi nào dùng luật mới', 'luat hien hanh'],
            response: "**Câu hỏi: Hiện nay đang sử dụng Luật Phòng chống ma túy nào?**\n\n**Trả lời**: \n- Hiện nay chúng ta đang sử dụng **Luật Phòng, chống ma túy năm 2021**.\n- Luật mới nhất là **Luật số 120/2025/QH15** vừa được Quốc hội thông qua và sẽ chính thức có hiệu lực từ ngày **01/07/2026**. \n=> Cả hai luật đều nghiêm cấm mọi hành vi liên quan đến ma túy để bảo vệ bạn."
        },
        {
            id: "prison_liability",
            keywords: ['học sinh có đi tù không', 'bị bắt thì sao', 'dưới 18 tuổi bị phạt thế nào', 'đi tù'],
            response: "**Câu hỏi: Học sinh dính vào ma túy có bị đi tù không?**\n\n**Trả lời**: Có bạn nhé! Tùy vào mức độ vi phạm (như vận chuyển, mua bán), học sinh vẫn phải chịu trách nhiệm hình sự. Đặc biệt, từ **đủ 12 tuổi trở lên**, nếu nghiện ma túy mà không tự nguyện cai, bạn có thể bị đưa vào **Cơ sở cai nghiện bắt buộc** (Theo Điều 36 Luật 2025)."
        },
        {
            id: "cure_addiction",
            keywords: ['cai được không', 'chữa được nghiện không', 'bỏ được không', 'cai nghien duoc khong'],
            response: "**Câu hỏi: Nghiện ma túy rồi có cai được không?**\n\n**Trả lời**: Rất khó! Ma túy làm hỏng cấu trúc não bộ, tạo ra sự thèm muốn mãnh liệt. Dù có cai được thì tỉ lệ tái nghiện cũng rất cao và sức khỏe đã bị tàn phá nặng nề. Cách tốt nhất là **Tuyệt đối không thử dù chỉ 1 lần**."
        },
        {
            id: "etymology",
            keywords: ['tại sao gọi là ma túy', 'ý nghĩa tên gọi', 'ten goi ma tuy'],
            response: "**Câu hỏi: Tại sao lại gọi là 'Ma túy'?**\n\n**Trả lời**: Trong tiếng Hán, 'Ma' là làm tê liệt, 'Túy' là say sưa. Cái tên này ám chỉ những chất khiến con người say đắm đến mức tê liệt ý thức, không còn là chính mình và bị nó điều khiển như một 'con ma'."
        },
        {
            id: "strength_myth",
            keywords: ['mạnh hơn', 'khỏe hơn', 'hút đá để khỏe', 'sung sức', 'khỏe người'],
            response: "**Câu hỏi: Có phải dùng ma túy đá sẽ giúp mình khỏe và mạnh hơn không?**\n\n**Trả lời**: Không hề! Đó là lời nói dối của kẻ xấu. Ma túy đá chỉ tạo ra **cảm giác hưng phấn giả tạo**, khiến bạn không thấy mệt trong chốc lát. Thực tế, nó đang vắt kiệt sức lực, làm tim bạn đập nhanh muốn nổ tung và làm chết các tế bào não."
        },
        {
            id: "accidental_ingestion",
            keywords: ['lỡ ăn phải', 'bị lừa ăn', 'nuốt phải ma túy', 'vô tình uống'],
            response: "**Câu hỏi: Nếu vô tình ăn phải đồ có ma túy thì phải làm sao?**\n\n**Trả lời**: Hãy giữ bình tĩnh và **báo ngay cho người lớn** (bố mẹ, thầy cô, y tế trường) lập tức. Đừng sợ bị mắng, vì việc cứu chữa kịp thời là quan trọng nhất để chất độc không thấm sâu vào cơ thể bạn."
        },
        {
            id: "precursor_info",
            keywords: ['tiền chất', 'tien chat la gi', 'chất sản xuất'],
            response: "**Câu hỏi: Tiền chất ma túy là gì?**\n\n**Trả lời**: Tiền chất là các loại hóa chất cần thiết trong quá trình sản xuất ma túy. Nếu không có chúng, kẻ xấu không thể tạo ra ma túy tổng hợp. Vì vậy, pháp luật quản lý tiền chất rất chặt chẽ để ngăn chặn ma túy từ gốc."
        },
        {
            id: "family_impact",
            keywords: ['bố mẹ buồn', 'ảnh hưởng gia đình', 'bố mẹ có tội không', 'tan nát gia đình'],
            response: "**Câu hỏi: Nếu tôi nghiện ma túy, gia đình tôi sẽ thế nào?**\n\n**Trả lời**: Gia đình bạn sẽ sụp đổ. Bố mẹ sẽ vô cùng đau khổ, kiệt quệ tiền bạc để lo cho bạn. Không khí gia đình sẽ luôn căng thẳng, cãi vã và hổ thẹn với xung quanh. Bạn sẽ trở thành gánh nặng lớn nhất của những người yêu thương bạn nhất."
        },
        {
            id: "helping_friend",
            keywords: ['giúp bạn', 'khuyên bạn nghiện', 'bạn dùng ma túy', 'bạn em dùng'],
            response: "**Câu hỏi: Tôi phải làm gì nếu biết bạn mình đang dùng ma túy?**\n\n**Trả lời**: Đừng im lặng giữ bí mật vì đó là đang hại bạn ấy. Hãy báo ngay cho thầy cô hoặc bố mẹ của bạn ấy. Đó không phải là 'mách lẻo', mà là bạn đang trực tiếp **cứu mạng** bạn mình trước khi quá muộn."
        },
        {
            id: "why_sell",
            keywords: ['tại sao vẫn bán', 'biết hại sao vẫn bán', 'người bán ma túy'],
            response: "**Câu hỏi: Tại sao ma túy độc hại mà người ta vẫn bán?**\n\n**Trả lời**: Vì **lợi nhuận khổng lồ**. Những kẻ buôn bán là tội phạm nhẫn tâm, chúng bất chấp mạng sống của người khác để kiếm tiền. Chúng thường nhắm vào học sinh vì các bạn còn nhỏ, dễ tin người và dễ bị lôi kéo."
        },
        {
            id: "passive_smoke",
            keywords: ['ngửi khói', 'ngửi ké', 'hít khói ma túy', 'hít thụ động'],
            response: "**Câu hỏi: Tôi không dùng nhưng ngửi khói của người khác dùng có sao không?**\n\n**Trả lời**: Có sao đấy! Đó là 'hút thụ động'. Bạn vẫn có thể bị nhiễm độc, nhức đầu, buồn nôn hoặc ảo giác nhẹ. Nếu thấy ai đó đang dùng ma túy, hãy tránh xa ngay để bảo vệ phổi và não bộ của mình."
        },
        {
            id: "school_gate_snack",
            keywords: ['quà vặt cổng trường', 'đồ ăn cổng trường', 'kẹo cổng trường'],
            response: "**Câu hỏi: Đồ ăn vặt ở cổng trường có an toàn không?**\n\n**Trả lời**: Một số kẻ xấu trà trộn ma túy vào kẹo mút, nước ngọt lạ không nhãn mác. Bạn nên chọn mua đồ ăn rõ nguồn gốc, tốt nhất là mua trong căng tin trường hoặc cửa hàng lớn để đảm bảo an toàn."
        },
        {
            id: "death_risk",
            keywords: ['có chết ngay không', 'thử 1 lần chết không', 'soc thuoc'],
            response: "**Câu hỏi: Thử ma túy một lần có chết ngay được không?**\n\n**Trả lời**: **CÓ THỂ**. Có hiện tượng 'Sốc thuốc'. Cơ thể mỗi người phản ứng khác nhau, có người chỉ cần dùng một lượng rất nhỏ lần đầu tiên đã bị co giật, ngừng tim và tử vong tại chỗ. Đừng dùng mạng sống để làm thí nghiệm!"
        },
        // --- CẬP NHẬT 30 TÌNH HUỐNG THỰC TẾ CHO HỌC SINH (ID & KEYWORDS DUY NHẤT) ---
        {
            id: "sit_candy",
            keywords: ['người lạ cho kẹo', 'cho nước ngọt', 'nhận đồ cổng trường', 'nhận không', 'ngon quá có nên ăn không'],
            response: "**Cảnh giác với đồ ăn lạ**: Một người lạ cho bạn kẹo hoặc chai nước ngoài cổng trường.\n\n**Lời khuyên**: Tuyệt đối **KHÔNG** nhận và không ăn/uống! Ma túy mới có thể giả dạng kẹo mút, kẹo dẻo hoặc nước ngọt. Hãy dứt khoát từ chối: 'Bố mẹ cháu dặn không nhận đồ người lạ' và rời đi ngay."
        },
        {
            id: "sit_dare",
            keywords: ['bạn rủ thử', 'thử cho biết', 'nhút nhát', 'thách thức', 'không thử là nhát'],
            response: "**Khi bạn bè thách thức**: Bạn bè bảo 'Thử một hơi đi, không thử là nhát gan'.\n\n**Lời khuyên**: Từ chối ma túy mới là bản lĩnh thực sự! Bạn hãy nói rõ: 'Tớ không dùng thứ này' và nhanh chóng rời đi. Bạn tốt sẽ không bao giờ ép bạn làm việc nguy hiểm đến tính mạng."
        },
        {
            id: "sit_vape",
            keywords: ['hút thử pod', 'vape thơm', 'thuốc lá điện tử có hại không', 'hút pod'],
            response: "**Thuốc lá điện tử (Pod/Vape)**: Bạn cùng lớp mời hút thử vì 'thơm và không nghiện'.\n\n**Lời khuyên**: Cực kỳ nguy hiểm! Thuốc lá điện tử hiện nay thường bị lén pha trộn ma túy đá hoặc cần sa tổng hợp. Nhiều học sinh đã bị co giật, loạn thần ngay lần hút đầu tiên. Bạn hãy kiên quyết nói KHÔNG."
        },
        {
            id: "sit_opened_drink",
            keywords: ['nước ngọt đã mở', 'chai nước mở nắp', 'ly nước rót sẵn', 'uống nước tiệc'],
            response: "**Đồ uống đã mở nắp**: Tại bữa tiệc, ai đó đưa bạn ly nước đã rót sẵn hoặc chai đã mở nắp.\n\n**Lời khuyên**: Đừng uống nếu bạn không quan sát quá trình rót nước. Ma túy lỏng như 'Nước vui' không màu, không mùi rất dễ bị lén hòa vào nước ngọt để làm hại bạn."
        },
        {
            id: "sit_carry",
            keywords: ['cầm hộ túi', 'xách hộ đồ', 'mang gói quà', 'có nên cầm giúp không', 'giữ túi hộ'],
            response: "**Nhờ cầm hộ đồ vật**: Người lạ hoặc bạn quen nhờ bạn xách hộ một gói đồ nhỏ đi một đoạn đường.\n\n**Lời khuyên**: Tuyệt đối **KHÔNG** cầm hộ khi không biết rõ bên trong là gì. Kẻ xấu thường lợi dụng sự ngây thơ của học sinh để biến bạn thành người vận chuyển ma túy trái phép."
        },
        {
            id: "sit_lsd",
            keywords: ['tem giấy', 'hình dán hoạt hình', 'bùa lưỡi là gì', 'ngậm tem'],
            response: "**Ma túy Tem giấy (LSD)**: Ai đó cho bạn mảnh giấy nhỏ in hình hoạt hình sặc sỡ và bảo ngậm sẽ rất thích.\n\n**Lời khuyên**: Đó là ma túy LSD ('Bùa lưỡi'). Chỉ một mảnh nhỏ ngậm vào lưỡi có thể gây ảo giác cực mạnh suốt nhiều giờ, làm bạn mất kiểm soát hành vi và nguy hiểm đến tính mạng."
        },
        {
            id: "sit_n2o",
            keywords: ['bóng cười ở quán', 'hít bóng cười', 'khí cười có hại không', 'n2o'],
            response: "**Khí cười (Bóng cười)**: Đi quán nước, bạn bè rủ hít 'Bóng cười' cho vui.\n\n**Lời khuyên**: Khí N2O tàn phá não bộ, dây thần kinh và phổi rất nặng, có thể gây liệt người hoặc đột quỵ. Bạn hãy từ chối ngay và khuyên bạn bè đừng nên chạm vào."
        },
        {
            id: "sit_friend_sign",
            keywords: ['nghi bạn nghiện', 'bạn hay ngủ gật', 'bạn hay xin tiền', 'giúp bạn dùng ma túy'],
            response: "**Giúp đỡ bạn bè**: Bạn nghi ngờ một người bạn trong lớp đang sử dụng ma túy (lừ đừ, trốn học, xin tiền nhiều).\n\n**Lời khuyên**: Không nên xa lánh hay gán nhãn bạn. Bạn hãy kín đáo kể lại sự việc với Thầy Cô hoặc Bố Mẹ để người lớn có biện pháp hỗ trợ bạn ấy kịp thời."
        },
        {
            id: "sit_stress",
            keywords: ['áp lực học tập', 'stress giải sầu', 'quên hết nỗi buồn', 'buồn chán rủ rê'],
            response: "**Khi gặp áp lực**: Bạn buồn chán vì điểm kém, người khác rủ dùng chất kích thích để 'giải sầu'.\n\n**Lời khuyên**: Ma túy không giúp quên nỗi buồn mà chỉ làm tương lai bạn sụp đổ. Hãy tập thể thao, nghe nhạc hoặc tâm sự với người thân để giải tỏa căng thẳng một cách lành mạnh nhé."
        },
        {
            id: "sit_threat",
            keywords: ['bị đe dọa ép dùng', 'bị ép thử', 'nhóm xấu bắt dùng', 'ép buộc'],
            response: "**Bị đe dọa, ép buộc**: Bạn bị nhóm người xấu ép phải thử ma túy và cấm không được kể với ai.\n\n**Lời khuyên**: Đừng giữ bí mật! Hãy thực hiện ngay bước **BÁO NGAY**: Nói cho Bố Mẹ, Thầy Cô hoặc gọi **111 / 113** để được các chú Công an hỗ trợ bảo vệ an toàn."
        },
        {
            id: "sit_karaoke",
            keywords: ['tiệc karaoke', 'quán bar đèn mờ', 'đi sinh nhật quán hát', 'bay lắc'],
            response: "**Nơi vui chơi nguy hiểm**: Bạn được mời sinh nhật tại quán Karaoke có âm thanh mạnh, đèn mờ.\n\n**Lời khuyên**: Đây là nơi dễ có ma túy tổng hợp. Bạn nên đi cùng người lớn đáng tin cậy, tự quản lý ly nước của mình và xin phép rời đi ngay nếu thấy người xung quanh dùng chất lạ."
        },
        {
            id: "sit_fake_tea",
            keywords: ['trà sữa lạ', 'gói bột lạ', 'túi bột sặc sỡ', 'uống trà sữa Trung Quốc'],
            response: "**Ma túy Trà sữa**: Bạn thấy gói bột ghi chữ 'Trà sữa' bao bì lạ, sặc sỡ không nhãn mác rõ ràng.\n\n**Lời khuyên**: Ma túy 'Trà sữa' thực chất là ma túy đá dạng bột tẩm hương liệu. Bạn tuyệt đối chỉ ăn uống thực phẩm rõ nguồn gốc do nhà trường hoặc gia đình cung cấp."
        },
        {
            id: "sit_online",
            keywords: ['bánh kẹo trên mạng', 'lazy cakes là gì', 'kẹo mút cần sa online', 'bán kẹo lạ trên fb'],
            response: "**Quảng cáo trên mạng**: Thấy mạng xã hội quảng cáo bánh lười (Lazy cakes) giúp 'học tốt hơn'.\n\n**Lời khuyên**: Đó là quảng cáo lừa đảo! Cần sa bị pháp luật nghiêm cấm. Dùng thực phẩm chứa cần sa sẽ gây nghiện và làm hỏng não bộ vĩnh viễn, bạn đừng bao giờ đặt mua nhé."
        },
        {
            id: "sit_family",
            keywords: ['bố mẹ nghiện', 'người thân dùng ma túy', 'người nhà nghiện thì sao', 'giúp người thân'],
            response: "**Người thân sử dụng ma túy**: Nếu bạn thấy người trong gia đình có biểu hiện nghi vấn dùng ma túy.\n\n**Lời khuyên**: Hãy giữ an toàn cho mình, không động vào các dụng cụ lạ và dũng cảm chia sẻ với thầy cô giáo để tìm cách giúp người thân được đi điều trị cai nghiện."
        },
        {
            id: "sit_meth_head",
            keywords: ['gặp người ngáo đá', 'người la hét múa may', 'người mất kiểm soát trên đường', 'ngáo đá làm gì'],
            response: "**Người bị ngáo đá**: Bạn thấy một người đang la hét, hành động kỳ quái, hung dữ trên phố.\n\n**Lời khuyên**: Tránh xa ngay lập tức! Họ đang bị ảo giác ma túy và có thể tấn công bạn bất cứ lúc nào. Không đứng xem, không quay phim, hãy tìm nơi có người lớn và gọi 113."
        },
        {
            id: "sit_needle",
            keywords: ['kim tiêm rơi', 'chạm vào kim tiêm', 'nhặt kim tiêm', 'vứt kim tiêm'],
            response: "**Rác thải y tế nguy hiểm**: Bạn nhìn thấy kim tiêm cũ vứt ở công viên hoặc cầu thang.\n\n**Lời khuyên**: Tuyệt đối không chạm vào! Kim tiêm có thể chứa máu nhiễm bệnh nguy hiểm. Bạn hãy báo ngay cho bác bảo vệ hoặc người lớn để họ thu dọn an toàn."
        },
        {
            id: "sit_4steps",
            keywords: ['lá chắn 4 bước', '4 bước tự bảo vệ', 'quy tắc an toàn', 'làm gì khi không ổn'],
            response: "**Lá chắn an toàn 4 bước giúp bảo vệ bạn**:\n1. **NHẬN RA**: Tình huống không an toàn.\n2. **TỪ CHỐI**: Kiên quyết nói 'KHÔNG' dứt khoát.\n3. **RỜI ĐI**: Di chuyển ngay tới nơi có người lớn.\n4. **BÁO NGAY**: Báo cho Bố Mẹ, Thầy Cô hoặc gọi 113 / 111."
        },
        {
            id: "sit_stigma",
            keywords: ['kỳ thị người nghiện', 'có nên ghét người nghiện không', 'đối xử với người nghiện'],
            response: "**Ứng xử văn minh**: Luật nghiêm cấm kỳ thị người cai nghiện (Luật 2025). \n\n**Lời khuyên**: Nghiện là một bệnh lý cần điều trị y tế. Bạn nên ủng hộ họ cai nghiện, nhưng bản thân mình phải luôn giữ vững bản lĩnh để không bao giờ bị lôi kéo thử ma túy."
        },
        {
            id: "sit_help_lines",
            keywords: ['113 là số gì', '111 là số gì', 'tổng đài hỗ trợ trẻ em', 'số cứu trợ'],
            response: "**Các con số cứu trợ khẩn cấp**:\n- **113**: Cảnh sát phản ứng nhanh (Báo tin tội phạm, ma túy).\n- **111**: Tổng đài Quốc gia Bảo vệ Trẻ em (Hỗ trợ bạn 24/7 khi bị đe dọa, bóc lột hoặc bạo hành)."
        },
        {
            id: "sit_law_test",
            keywords: ['công an kiểm tra ma túy', 'xét nghiệm ma túy điều 23', 'ai bị xét nghiệm'],
            response: "**Quy định xét nghiệm**: Theo Điều 23 Luật 2025, Công an có quyền yêu cầu xét nghiệm đối với người có căn cứ sử dụng trái phép ma túy. Việc chấp hành xét nghiệm là nghĩa vụ của mọi công dân để bảo vệ an ninh trật tự."
        },
        {
            id: "sit_free_stuff",
            keywords: ['phát quà miễn phí', 'phát kẹo miễn phí', 'đồ người lạ tặng', 'có nên lấy đồ miễn phí không'],
            response: "**Quà miễn phí đáng ngờ**: Có người đứng cổng trường phát kẹo, nước ngọt miễn phí và bảo ăn thử.\n\n**Lời khuyên**: Hãy cảnh giác! Những thứ miễn phí từ người lạ đôi khi là mồi nhử ma túy. Bạn nên mang vào hỏi ý kiến thầy cô trước khi có ý định sử dụng."
        },
        {
            id: "sit_fruit_candy",
            keywords: ['kẹo dẻo hoa quả lạ', 'kẹo mút không nhãn mác', 'thực phẩm trá hình', 'kẹo ngon'],
            response: "**Kẹo không rõ nguồn gốc**: Bạn thấy kẹo dẻo hoa quả đẹp mắt nhưng bao bì mờ nhạt, chữ lạ.\n\n**Lời khuyên**: Đó có thể là ma túy núp bóng thực phẩm. Đừng ăn những thứ có vẻ ngoài hấp dẫn nhưng nguồn gốc mù mờ để bảo vệ sức khỏe chính mình."
        },
        {
            id: "sit_burnt_grass",
            keywords: ['đốt cỏ khô', 'ngửi mùi khét', 'vườn cây cỏ lạ', 'nghịch cỏ'],
            response: "**Mùi khét lạ (Cỏ Mỹ)**: Bạn thấy bạn bè đốt một loại cỏ khô và ngửi mùi khói rất khét.\n\n**Lời khuyên**: Tránh xa ngay! Đó có thể là 'Cỏ Mỹ' cực độc, khói của nó gây ảo giác bạo lực và hỏng não. Bạn hãy chạy đi và báo cho thầy cô giáo ngay lập tức."
        },
        {
            id: "sit_hide_item",
            keywords: ['giấu đồ vào cặp hộ', 'để nhờ vào túi hộ', 'giấu đồ giúp bạn', 'cất gói nhỏ'],
            response: "**Nhờ giấu đồ vật**: Một người quen nhờ bạn 'giấu hộ' một gói nhỏ vào cặp sách vì sợ bố mẹ mắng.\n\n**Lời khuyên**: Tuyệt đối **KHÔNG** giúp! Bạn có thể vô tình trở thành người tàng trữ chất cấm và bị pháp luật xử lý. Hãy dứt khoát từ chối để bảo vệ chính mình."
        },
        {
            id: "sit_med_stranger",
            keywords: ['đau bụng người lạ cho thuốc', 'nhức đầu cho thuốc', 'uống thuốc người lạ đưa'],
            response: "**Uống thuốc an toàn**: Bạn đang mệt, một người lạ tiến đến đưa viên thuốc bảo 'uống đi là khỏi ngay'.\n\n**Lời khuyên**: Tuyệt đối **KHÔNG** uống! Bạn chỉ nên nhận thuốc từ bố mẹ hoặc nhân viên y tế trường. Thuốc của người lạ có thể chứa chất gây ngủ hoặc ma túy tổng hợp."
        },
        {
            id: "sit_game_net",
            keywords: ['đang chơi game cho nước', 'quán internet cho uống nước', 'lon nước mở sẵn ở tiệm net'],
            response: "**Tại quán Internet**: Có người mang lon nước đã mở sẵn mời bạn uống khi bạn đang tập trung chơi game.\n\n**Lời khuyên**: Đừng uống! Kẻ xấu thường lén bỏ thuốc lắc hoặc chất kích thích vào đồ uống mở sẵn để lôi kéo học sinh vào con đường nghiện ngập."
        },
        {
            id: "sit_party_alcohol",
            keywords: ['uống thử bia rượu cho giống đàn ông', 'thử bia rượu ở tiệc', 'cho trẻ con uống rượu'],
            response: "**Bia rượu và chất kích thích**: Ở đám tiệc, người lớn bảo 'thử tí rượu cho giống đàn ông'.\n\n**Lời khuyên**: Bia rượu hại sức khỏe và dễ bị lợi dụng để pha thêm ma túy. Bạn hãy mạnh dạn từ chối và chọn nước lọc hoặc nước trái cây để giữ mình tỉnh táo."
        },
        {
            id: "sit_pseudo_friend",
            keywords: ['người quen tự xưng', 'bạn của bố mẹ đưa đồ', 'chú hàng xóm rủ'],
            response: "**Người quen không rõ ràng**: Một người tự nhận là bạn của bố mẹ đưa đồ ăn và rủ bạn đi cùng.\n\n**Lời khuyên**: Nếu bố mẹ chưa dặn trước, bạn không được nhận và không được đi theo. Hãy gọi điện hỏi ý kiến bố mẹ ngay để đảm bảo an toàn tuyệt đối."
        },
        {
            id: "sit_secrets",
            keywords: ['bí mật giữa chúng ta quà biến mất', 'người lạ dặn đừng kể', 'bí mật với bố mẹ'],
            response: "**Lời hứa giữ bí mật**: Người lạ cho quà và dặn 'Đây là bí mật, nếu kể cho bố mẹ thì quà biến mất'.\n\n**Lời khuyên**: Đây là lời nói dối! Những bí mật mà người lạ yêu cầu giữ kín thường là điều xấu. Bạn hãy kể ngay cho bố mẹ để họ bảo vệ bạn kịp thời."
        },
        {
            id: "sit_lost_memory",
            keywords: ['mất trí nhớ vì ma túy', 'ngáo đá là gì vậy', 'lên cơn lạ trên phố'],
            response: "**Biểu hiện mất kiểm soát**: Bạn thấy một người đang la hét, múa may kỳ lạ trên đường.\n\n**Lời khuyên**: Đó là dấu hiệu của ảo giác do ma túy. Đừng tò mò đứng xem. Bạn hãy giữ khoảng cách an toàn và tìm nơi có sự che chở của người lớn hoặc Công an."
        },
// --- BỔ SUNG: CẠM BẪY MẠNG & KỸ NĂNG MỞ LỜI ---
        {
            keywords: ['mạng xã hội', 'facebook', 'tiktok', 'quen qua mạng', 'the game'],
            response: "**Cảnh giác trên mạng**: Kẻ xấu có thể đóng giả làm bạn cùng lứa tuổi để làm quen, tặng quà hoặc thẻ game. \n\n**Lời khuyên**: Tuyệt đối không cung cấp địa chỉ nhà, không đi gặp mặt người lạ quen qua mạng một mình và không nhận bưu phẩm hộ người lạ. Đó có thể là bẫy lôi kéo sử dụng hoặc vận chuyển ma túy đấy!"
        },
        {
            keywords: ['sợ bị mắng', 'làm sao kể với bố mẹ', 'cách nói chuyện', 'giấu bí mật'],
            response: "**Đừng sợ bị mắng!** Nếu bạn lỡ làm sai hoặc gặp chuyện đáng sợ, hãy dũng cảm nói với bố mẹ. \n\n**Cách nói**: 'Bố mẹ ơi, có chuyện này làm con rất lo lắng, con muốn kể để bố mẹ giúp con...'. Bố mẹ và thầy cô là những người yêu thương bạn nhất, họ sẽ bảo vệ bạn thay vì trách phạt khi bạn thành thật."
        },
        {
            keywords: ['giúp bạn mình', 'bạn em dùng ma túy', 'khuyên bạn'],
            response: "**Giúp đỡ bạn bè**: Nếu thấy bạn mình có dấu hiệu dùng ma túy hoặc bị người xấu lôi kéo, bạn đừng im lặng. Hãy bí mật báo với thầy cô giáo hoặc bố mẹ của bạn ấy. Đó không phải là 'mách lẻo', mà là bạn đang trực tiếp **cứu mạng** bạn mình đấy!"
        },
        {
            keywords: ['số điện thoại khẩn cấp', 'gọi cho ai', '113', '111'],
            response: "**Ghi nhớ các con số an toàn:**\n- **111**: Tổng đài Quốc gia bảo vệ Trẻ em (gọi miễn phí 24/7).\n- **113**: Công an phản ứng nhanh.\nNếu thấy nguy hiểm hoặc bị đe dọa, hãy gọi ngay hoặc tìm đến chú Công an gần nhất nhé!"
        },
        
// --- BỔ SUNG: THOẠI TÂM LÝ, CẢM XÚC VÀ CÁC TÌNH HUỐNG NGÔ NGHÊ (KEY DUY NHẤT) ---
        {
            id: "chat_story",
            keywords: ['mình kể chuyện bạn nghe', 'nghe mình kể nè', 'có chuyện này', 'kể cho bạn nghe'],
            response: "Tôi luôn sẵn sàng lắng nghe bạn đây! Bạn cứ kể đi, có chuyện gì làm bạn lo lắng hay băn khoăn à? Đừng ngại nhé, tôi sẽ giữ bí mật và cùng bạn tìm cách giải quyết tốt nhất."
        },
        {
            id: "feeling_sad",
            keywords: ['mình buồn quá', 'tôi đang buồn', 'thấy chán quá', 'không vui tí nào'],
            response: "Tôi chia sẻ với nỗi buồn của bạn nhé. Khi buồn, bạn đừng giữ trong lòng một mình. Bạn có thể thử nghe một bản nhạc nhẹ, vẽ một bức tranh hoặc đi bộ ngoài trời. Nếu bạn buồn vì áp lực hay bị ai đó bắt nạt, hãy tin tưởng kể cho tôi hoặc người lớn mà bạn yêu quý nhất nhé. Mọi chuyện rồi sẽ ổn thôi!"
        },
        {
            id: "feeling_scared",
            keywords: ['tớ đang lo sợ', 'mình đang lo sợ', 'tôi sợ quá', 'giúp t được không', 'cứu tôi với'],
            response: "Bạn bình tĩnh nhé, có tôi ở đây rồi! Hãy hít thở thật sâu nào. Bây giờ bạn hãy nhìn xung quanh xem có người lớn nào gần đó không (bố mẹ, thầy cô, chú bảo vệ)? Nếu bạn đang gặp nguy hiểm, hãy gọi ngay **113** hoặc **111**. Bạn không đơn độc đâu!"
        },
        {
            id: "temptation_hungry",
            keywords: ['bánh ngon mà', 'đang khát nước', 'nhìn thèm quá', 'chai nước ngọt nhìn ngon', 'đang đói'],
            response: "**Tại sao bánh ngon/nước ngọt lại không được nhận?**\n\nTôi biết là bánh kẹo và nước ngọt ngoài cổng trường nhìn rất hấp dẫn, nhất là khi bạn đang đói hoặc khát. Nhưng bạn ơi, kẻ xấu rất tinh vi, chúng trộn ma túy vào đó để lừa chúng mình 'nghiện' mà không biết. \n\n**Lời khuyên**: Thà chịu khát một chút để về nhà uống nước an toàn, còn hơn uống nhầm 'Nước vui' mà hỏng cả tương lai. Bạn hãy là một người thông minh, chỉ ăn đồ bố mẹ chuẩn bị thôi nhé!"
        },
        {
            id: "curiosity_risk",
            keywords: ['tớ rất thích', 'mình rất thích', 'mình tò mò', 'thử cho biết cảm giác', 'tò mò quá'],
            response: "**Sự tò mò đáng giá bao nhiêu?**\n\nTò mò về thế giới là tốt, nhưng tò mò với ma túy là một sai lầm không thể sửa chữa. Kẻ xấu thường nói: 'Thử đi, cảm giác như bay lên mây'. Thực tế là bạn sẽ 'rơi xuống vực thẳm' đấy. Ma túy đánh lừa não bộ bằng cảm giác hưng phấn giả tạo rồi sau đó phá hủy nó vĩnh viễn. Đừng dùng mạng sống của mình để thỏa mãn sự tò mò bạn nhé!"
        },
        {
            id: "fear_of_scolding",
            keywords: ['sợ bố mẹ mắng', 'sợ thầy cô phạt', 'tớ lỡ làm sai', 'mình lỡ làm sai', 'không dám nói thật'],
            response: "**Đừng để nỗi sợ ngăn cản bạn được bảo vệ!**\n\nBố mẹ và thầy cô có thể nghiêm khắc, nhưng đó là vì họ yêu thương và muốn bạn an toàn. Nếu bạn lỡ nhận đồ người lạ hoặc làm điều gì sai liên quan đến chất cấm, hãy **DŨNG CẢM NÓI THẬT** ngay lập tức. Càng để lâu, hậu quả càng nặng. Người lớn sẽ bảo vệ bạn khỏi kẻ xấu chứ không chỉ mắng mỏ bạn đâu. Tin tôi đi!"
        },
        {
            id: "threatened_secret",
            keywords: ['họ dọa tớ', 'bị dọa đánh', 'họ dọa', 'anh ấy dọa', 'cô ấy dọa', 'ấy dọa', 'bắt giữ bí mật', 'ép không được nói'],
            response: "**Bí mật không an toàn**: Kẻ xấu thường dọa: 'Nếu kể cho ai thì sẽ bị đánh' hoặc 'Nếu nói ra quà sẽ biến mất'. \n\n**Sự thật là**: Đó là đòn tâm lý của tội phạm. Khi bạn nói ra, kẻ xấu mới là người sợ hãi vì các chú Công an sẽ vào cuộc. Bất cứ bí mật nào làm bạn thấy sợ hãi thì đó **KHÔNG PHẢI** là bí mật tốt. Hãy nói ngay với người lớn để phá tan cái bẫy đó nhé!"
        },
        {
            id: "action_when_danger",
            keywords: ['phải làm gì khi gặp nguy hiểm', 'cách tự bảo vệ mình', 'thoát thân thế nào'],
            response: "**Cách bảo vệ mình khi gặp nguy hiểm:**\n1. **Bình tĩnh**: Không hoảng loạn để quan sát lối thoát.\n2. **Gây chú ý**: Hét thật to 'CỨU TÔI VỚI' hoặc 'CHÁY' để mọi người xung quanh chú ý.\n3. **Chạy**: Chạy thật nhanh về nơi có ánh sáng, đông người hoặc trạm Công an.\n4. **Gọi điện**: Gọi miễn phí vào số **113** hoặc **111** ngay khi có điện thoại."
        },
        {
            id: "pressure_school",
            keywords: ['tớ áp lực', 'tớ áp lực', 'nhiều bài tập quá', 'mệt mỏi vì học', 'muốn bỏ hết'],
            response: "Tôi hiểu áp lực học tập đôi khi làm bạn mệt mỏi. Nhưng tuyệt đối không được nghe lời kẻ xấu rủ rê dùng 'thuốc bổ não' hay 'kẹo thần kỳ' để tỉnh táo nhé, đó là ma túy trá hình đấy! Khi mệt, bạn hãy xin phép bố mẹ nghỉ ngơi, chơi thể thao hoặc tâm sự với thầy cô về khó khăn của mình. Học tập là đường dài, sức khỏe của bạn mới là quan trọng nhất!"
        },
        // --- PHẦN HƯỚNG DẪN HỌC BÀI GIẢNG E-LEARNING ---
        {
            keywords: ['cách học', 'hướng dẫn học', 'học như thế nào', 'bắt đầu học', 'hoc bai giang'],
            response: "Chào bạn! Để học bài giảng điện tử một cách hiệu quả nhất, bạn thực hiện theo các bước sau nhé:\n1. **Đăng nhập**: Truy cập vào hệ thống để bắt đầu bài học.\n2. **4 Hoạt động chính**: Khởi động ➔ Hình thành kiến thức (4 Trạm học tập) ➔ Luyện tập ➔ Vận dụng.\n3. **Tương tác**: Xem video tình huống, thử tài suy luận và trả lời câu hỏi tương tác.\n4. **Chatbot**: Cần tra cứu kiến thức nào bạn cứ gõ câu hỏi vào đây nhé!"
        },
        {
            keywords: ['hoạt động 2', '4 trạm', 'trạm học tập', 'tram hoc tap'],
            response: "Ở **Hoạt động 2**, có **4 Trạm học tập** độc lập. Bạn có thể tự do chọn học bất kỳ trạm nào trước cũng được! Mỗi trạm có hình ảnh, video và tư liệu phong phú."
        },
        {
            keywords: ['mimi', '60 giây', 'hiểu đúng cùng mimi'],
            response: "Phần **'60 giây hiểu đúng cùng Mimi'** nằm trong mỗi trạm của Hoạt động 2, giúp bạn chốt lại kiến thức quan trọng nhất chỉ trong 1 phút!"
        },
// --- BỔ SUNG: KỸ NĂNG LÁ CHẮN AN TOÀN & CÔNG THỨC BÁO TIN (KEY DUY NHẤT) ---
        {
            id: "safety_shield_detail",
            keywords: ['kỹ năng phòng tránh', 'lá chắn an toàn của em', 'bốn bước bảo vệ', 'quy tắc 4 bước', 'lam gi khi thay bat thuong'],
            response: "**Lá chắn an toàn của bạn gồm 4 bước 'vàng' sau đây:**\n\n" +
                      "1. 👀 **NHẬN RA**: Thấy điều bất thường, đồ vật không rõ nguồn gốc hoặc ai đó yêu cầu bạn giữ bí mật.\n" +
                      "2. ✋ **TỪ CHỐI**: Nói rõ ràng và dứt khoát: *'Không, em không làm!'* hoặc *'Cháu không dùng đâu ạ!'*.\n" +
                      "3. 🏃 **RỜI ĐI**: Đi ngay đến nơi an toàn có người lớn đáng tin cậy (nhà trường, đồn công an, nơi đông người).\n" +
                      "4. 📢 **BÁO NGAY**: Kể lại sự việc theo công thức 3 mảnh ghép để được giúp đỡ kịp thời."
        },
        {
            id: "reporting_formula",
            keywords: ['báo tin thế nào', 'nói gì để người lớn giúp', 'công thức 3 mảnh ghép', 'ba manh ghep', 'cách kể lại sự việc', 'nói gì để người lớn giúp', 'báo tin như thế nào',],
            response: "**Để người lớn giúp được bạn, hãy báo tin ngắn gọn theo 3 mảnh ghép này:**\n\n" +
                      "📍 **EM ĐANG Ở ĐÂU?** (Ví dụ: Cổng trường, công viên, tiệm nét...)\n" +
                      "⚠️ **CHUYỆN GÌ ĐÃ XẢY RA?** (Ví dụ: Có người lạ nhờ cầm túi đồ, mời ăn kẹo lạ...)\n" +
                      "🆘 **EM CẦN GIÚP GÌ?** (Ví dụ: Bố mẹ đón em ngay, cô giúp em với...)\n\n" +
                      "**Ghi nhớ**: Báo tin không cần dài - Chỉ cần rõ 3 ý trên!"
        },
        {
            id: "report_examples",
            keywords: ['mẫu báo tin', 'ví dụ cách nói', 'kịch bản báo cho cô', 'nói với bố mẹ thế nào'],
            response: "**Dưới đây là 2 mẫu báo tin thông minh bạn có thể xem:**\n\n" +
                      "• **Mẫu 1 (Nói với bố mẹ)**: *'Con đang ở cổng trường. Có một người vừa nhờ con mang một gói đồ nhưng con không biết bên trong có gì. Con đã từ chối và đi vào trong trường. Bố mẹ đến đón con giúp con nhé!'*\n\n" +
                      "• **Mẫu 2 (Nói với thầy cô)**: *'Thưa cô, lúc nãy có người nhờ em mang một gói đồ ra đầu đường và bảo em không cần biết bên trong có gì. Em không cầm và đã đi vào trường. Cô giúp em với ạ!'*"
        },
        {
            id: "happy_tree_spread",
            keywords: ['lan tỏa thông điệp', 'vườn cây hạnh phúc', 'địa chỉ vườn cây', 'viết thông điệp ở đâu', 'vuoncayhanhphuc'],
            response: "Hãy cùng tôi lan tỏa thông điệp phòng chống ma túy đến tất cả mọi người nhé! \n\n" +
                      "Bạn hãy truy cập vào **Vườn cây hạnh phúc** tại địa chỉ: \n" +
                      "👉 **https://vuoncayhanhphucththanhbinh.vercel.app/** \n\n" +
                      "Tại đây, bạn có thể viết những thông điệp an toàn để gieo mầm xanh hạnh phúc, giúp trường học và cộng đồng của chúng mình luôn sạch bóng ma túy!"
        },
        {
            id: "emergency_help_111",
            keywords: ['cần trợ giúp khẩn cấp', 'số 111 là gì', 'liên hệ ai bảo vệ'],
            response: "Khi gặp nguy hiểm khẩn cấp hoặc cảm thấy không an toàn, ngoài việc tìm người lớn bên cạnh, bạn hãy gọi ngay:\n\n" +
                      "📞 **111**: Tổng đài Quốc gia Bảo vệ Trẻ em (Miễn phí, hỗ trợ 24/7).\n" +
                      "📢 **Hãy dũng cảm lên, mọi người luôn sẵn sàng bảo vệ bạn!**"
        },
// --- BỔ SUNG: QUY TẮC 5 KHÔNG (ID & KEY DUY NHẤT) ---
        {
            id: "rule_5_no",
            keywords: ['quy tắc 5 không', '5 không là gì', 'năm không', 'nguyên tắc 5 không', 'quy tac 5 khong'],
            response: "**QUY TẮC 5 KHÔNG giúp bạn luôn an toàn:**\n\n" +
                      "1. 🚫 **KHÔNG cầm hộ** đồ vật lạ của người khác.\n" +
                      "2. 🚫 **KHÔNG mở, ngửi, nếm hoặc thử** bất kỳ chất lạ nào.\n" +
                      "3. 🚫 **KHÔNG sử dụng** đồ ăn, thức uống, thuốc hoặc chất lạ không rõ nguồn gốc.\n" +
                      "4. 🚫 **KHÔNG giữ bí mật** khi có việc gì khiến bạn thấy lo lắng, sợ hãi hoặc không an toàn.\n" +
                      "5. 🚫 **KHÔNG tự mình điều tra** – Khi thấy dấu hiệu nghi ngờ, hãy rời đi ngay và báo người lớn.\n\n" +
                      "Hãy thuộc lòng 5 quy tắc này để trở thành một học sinh thông minh và bản lĩnh bạn nhé!"
        },
// --- BỔ SUNG: Ý TƯỞNG DỰ ÁN PHÒNG CHỐNG MA TÚY & ĐỀ TÀI STEM ---
        {
            id: "project_ideas_general",
            keywords: ['ý tưởng dự án', 'làm dự án gì', 'hoạt động tuyên truyền', 'dự án phòng chống', 'sang kien phong chong'],
            response: "Chào bạn! Nếu bạn đang tìm ý tưởng dự án phòng chống ma túy, tôi gợi ý cho bạn 6 hướng đi cực kỳ thú vị và hiệu quả sau đây:\n\n" +
                      "1. **Tương lai trong tay bạn**: Thiết kế Poster, Infographic, Video ngắn.\n" +
                      "2. **Nhận diện và Từ chối**: Đóng vai (Role-play) xử lý tình huống thực tế.\n" +
                      "3. **Trường học không ma túy**: Khảo sát ẩn danh và đề xuất giải pháp cho nhà trường.\n" +
                      "4. **Mạng xã hội và Ma túy**: Nhận diện bẫy lừa đảo trên không gian mạng.\n" +
                      "5. **Bạn bè bảo vệ bạn bè**: Thành lập nhóm tuyên truyền viên, sản xuất Podcast/Quiz.\n" +
                      "6. **Một ngày không ma túy**: Chiến dịch cao điểm với các cuộc thi vẽ tranh và cam kết an toàn.\n\n" +
                      "Bạn muốn tôi tư vấn chi tiết hơn về mục nào không?"
        },
        {
            id: "project_creative_arts",
            keywords: ['thiết kế poster', 'vẽ tranh ma túy', 'làm video ngắn', 'infographic', 'triển lãm trường'],
            response: "**Dự án: 'Nói không với ma túy – Tương lai trong tay bạn'**\n\n" +
                      "• **Cách làm**: Bạn cùng nhóm bạn hãy sáng tạo các ấn phẩm truyền thông như Poster treo ở hành lang, Infographic dễ hiểu về tác hại ma túy, hoặc các đoạn clip ngắn (Reels/TikTok) mang thông điệp tích cực.\n" +
                      "• **Mục tiêu**: Giúp mọi người 'nhìn là hiểu - xem là nhớ' về tác hại của ma túy đối với sức khỏe và gia đình thông qua một triển lãm nhỏ ngay tại trường."
        },
        {
            id: "project_roleplay_skills",
            keywords: ['đóng vai tình huống', 'thực hành từ chối', 'kịch ngắn', 'dien kich', 'tình huống giả định'],
            response: "**Dự án: 'Nhận diện nguy cơ – Biết cách từ chối'**\n\n" +
                      "• **Cách làm**: Tổ chức các buổi sinh hoạt lớp, nơi các bạn đóng vai các tình huống như: bị bạn rủ dùng thử 'kẹo', nhận nước ngọt lạ từ người lạ, hoặc bị lôi kéo qua mạng.\n" +
                      "• **Mục tiêu**: Giúp bạn rèn luyện bản lĩnh để nói 'KHÔNG' một cách dứt khoát và biết cách tìm người lớn hỗ trợ khi cảm thấy không an toàn."
        },
        {
            id: "project_social_digital",
            keywords: ['ma túy trên mạng', 'dụ dỗ qua mạng', 'báo cáo nội dung xấu', 'thông tin sai lệch', 'an toàn internet'],
            response: "**Dự án: 'Mạng xã hội nói gì về ma túy?'**\n\n" +
                      "• **Cách làm**: Bạn hãy nghiên cứu cách các kẻ xấu 'bình thường hóa' ma túy qua các video/hình ảnh trên mạng xã hội.\n" +
                      "• **Mục tiêu**: Hướng dẫn các bạn cách nhận biết những lời dụ dỗ 'ngọt ngào' trên mạng, phân biệt thông tin sai lệch và cách báo cáo (report) các nội dung nguy hiểm để bảo vệ cộng đồng mạng."
        },
        {
            id: "project_peer_support",
            keywords: ['bạn bè bảo vệ bạn bè', 'tuyên truyền viên', 'nhóm hỗ trợ', 'làm podcast', 'quiz ma túy'],
            response: "**Dự án: 'Bạn bè bảo vệ bạn bè'**\n\n" +
                      "• **Cách làm**: Thành lập một câu lạc bộ 'Đại sứ An toàn'. Mỗi tháng thực hiện một hoạt động như: tổ chức trò chơi Quiz nhanh, làm Podcast chia sẻ tâm sự, hoặc sân khấu hóa các thông điệp phòng chống ma túy.\n" +
                      "• **Mục tiêu**: Nhấn mạnh việc hỗ trợ, giúp đỡ bạn bè vượt qua cám dỗ mà không kỳ thị, xa lánh."
        },
        {
            id: "stem_project_topic",
            keywords: ['đề tài stem', 'dự án stem', 'khoa học kỹ thuật', 'hệ thống truyền thông', 'ý tưởng stem ma túy'],
            response: "**Gợi ý đề tài STEM/Cuộc thi Khoa học kỹ thuật:**\n\n" +
                      "Bạn có thể xây dựng đề tài: **'Hệ thống truyền thông học đường giúp học sinh nhận diện và phòng tránh nguy cơ ma túy trên môi trường mạng'**.\n\n" +
                      "• **Sản phẩm có thể là**: Một ứng dụng (App) tích hợp Chatbot thông minh, hoặc hệ thống quét mã QR tại các bảng tin trường để hiện ra các video hướng dẫn kỹ năng nhanh.\n" +
                      "• **Tính mới**: Sử dụng công nghệ để bảo vệ học sinh 24/7, mọi lúc mọi nơi!"
        },
// --- BỔ SUNG: DỰ ÁN PHÒNG CHỐNG, TÁC HẠI HỌC ĐƯỜNG & CHI TIẾT THUỐC LÁ ĐIỆN TỬ ---
        {
            id: "prevention_methods",
            keywords: ['phương pháp phòng chống', 'dự án phòng chống', 'cấp 1', 'cấp 2', 'cấp 3', 'tiểu học', 'thcs', 'thpt'],
            response: "**Phương pháp phòng chống ma túy theo từng cấp học:**\n" +
                      "• **Tiểu học (Cấp 1)**: Tập trung hình thành bản năng an toàn qua trò chơi, kể chuyện. Giúp các em nhận diện tình huống không an toàn và áp dụng quy tắc: *Nhận ra - Từ chối - Rời đi - Báo ngay*.\n" +
                      "• **THCS (Cấp 2)**: Giáo dục kỹ năng từ chối lời rủ rê của bạn bè, tìm hiểu Luật 2025 (đặc biệt là Điều 36 về cai nghiện từ 12 tuổi). Tổ chức các CLB kỹ năng sống.\n" +
                      "• **THPT (Cấp 3)**: Trang bị kiến thức về trách nhiệm hình sự, kỹ năng quản lý căng thẳng (stress), định hướng nghề nghiệp và tham gia các chiến dịch tuyên truyền cộng đồng."
        },
        
        {
            id: "vape_definition",
            keywords: ['thuốc lá điện tử là gì', 'vape là gì', 'pod là gì', 'e-cigs', 'mods', 'bút vape', 'cấu tạo vape'],
            response: "**Thuốc lá điện tử (Vape/E-cigs/Pod):**\n" +
                      "- **Cấu tạo**: Gồm pin, bộ đốt và buồng chứa dịch lỏng.\n" +
                      "- **Nguyên lý**: Đốt nóng dịch lỏng tạo khói để hít vào phổi. Khói này chứa Nicotin, chất tạo hương và hóa chất độc hại.\n" +
                      "- **Hình dạng**: Có loại giống điếu thuốc truyền thống, có loại ngụy trang như cây bút, ổ USB để lừa dối mắt nhìn của người lớn."
        },
        {
            id: "vape_toxic_substances",
            keywords: ['trong vape có gì', 'khói thuốc điện tử', 'nicotin trong vape', 'hạt siêu mịn', 'kim loại nặng'],
            response: "**Khói thuốc lá điện tử chứa những gì?**\n" +
                      "Đừng lầm tưởng đó chỉ là hơi nước thơm! Trong khói vape chứa:\n" +
                      "• **Nicotin**: Chất gây nghiện cực mạnh.\n" +
                      "• **Hạt siêu mịn**: Cắm sâu và phá hủy phổi.\n" +
                      "• **Diacetyl**: Chất tạo hương gây bệnh phổi nghiêm trọng.\n" +
                      "• **Kim loại nặng**: Niken, thiếc, chì... gây ung thư.\n" +
                      "• **Lưu ý**: Nhiều loại quảng cáo 'không Nicotin' nhưng thực tế vẫn bị phát hiện chứa chất này."
        },
        {
            id: "vape_health_impact",
            keywords: ['vape hại sức khỏe', 'hại não bộ', 'phát triển não', '20 đến 25 tuổi', 'ngộ độc dịch lỏng'],
            response: "**Tác hại của Thuốc lá điện tử đối với bạn trẻ:**\n" +
                      "1. **Hại não bộ**: Nicotin ảnh hưởng đến sự phát triển não bộ của thanh thiếu niên (não bạn sẽ tiếp tục phát triển đến năm 25 tuổi).\n" +
                      "2. **Gây nghiện**: Rất dễ nghiện và dẫn dắt bạn đến với ma túy truyền thống.\n" +
                      "3. **Thương tích cháy nổ**: Pin lỗi có thể **phát nổ** khi sạc hoặc đang sử dụng, gây thương tích nghiêm trọng.\n" +
                      "4. **Ngộ độc cấp tính**: Nuốt hoặc để dịch lỏng dính vào mắt, da có thể gây ngộ độc Nicotin cấp tính nguy hiểm tính mạng."
        },
// --- PHÂN LOẠI THEO CẤP HỌC & KỸ NĂNG TỪ CHỐI THỰC CHIẾN (KEY DUY NHẤT) ---
        {
            id: "edu_primary",
            keywords: ['phòng chống tiểu học', 'học sinh cấp 1', 'trẻ em bảo vệ mình', 'tiểu học cần làm gì'],
            response: "**Dành cho học sinh Tiểu học:**\n" +
                      "• **Nguy cơ**: Ma túy làm hỏng não bộ, khiến bạn mất tập trung, ghi nhớ kém và dễ bị ngộ độc.\n" +
                      "• **Hành động**: \n" +
                      "  1. Tuyệt đối không ăn, uống đồ lạ từ người khác.\n" +
                      "  2. Không tò mò thử các viên kẹo, nước ngọt màu sắc sặc sỡ.\n" +
                      "  3. Khi thấy nghi ngờ, hãy từ chối và báo ngay cho bố mẹ hoặc thầy cô."
        },
        {
            id: "edu_thcs",
            keywords: ['phòng chống thcs', 'học sinh cấp 2', 'lứa tuổi thcs', 'thcs cần làm gì'],
            response: "**Dành cho học sinh THCS (Cấp 2):**\n" +
                      "• **Nguy cơ**: Đây là lứa tuổi dễ bị bạn bè lôi kéo do tò mò. Ma túy làm giảm kết quả học tập, thay đổi tâm lý, khiến bạn xa lánh gia đình và dễ bị lệ thuộc chất gây nghiện.\n" +
                      "• **Hành động**: \n" +
                      "  1. Cảnh giác với lời mời 'thử cho biết' hoặc 'thể hiện bản thân'.\n" +
                      "  2. Sử dụng mạng xã hội an toàn, không tin quảng cáo ma túy 'an toàn'.\n" +
                      "  3. Tìm đến cán bộ tư vấn hoặc người lớn tin cậy khi gặp áp lực."
        },
        {
            id: "edu_thpt",
            keywords: ['phòng chống thpt', 'học sinh cấp 3', 'lứa tuổi thpt', 'tương lai nghề nghiệp'],
            response: "**Dành cho học sinh THPT (Cấp 3):**\n" +
                      "• **Nguy cơ**: Môi trường xã hội phức tạp dễ dẫn đến việc dùng thử ma túy, gây mất kiểm soát hành vi, nghề nghiệp.\n" +
                      "• **Hành động**: \n" +
                      "  1. Xây dựng lối sống lành mạnh qua thể thao và các sở thích tích cực.\n" +
                      "  2. Nói KHÔNG dứt khoát với mọi cuộc tụ tập có dấu hiệu dùng chất cấm.\n" +
                      "  3. Không tiếp tay mua bán, vận chuyển dù chỉ là 'cầm hộ'."
        },
        {
            id: "refusal_scripts",
            keywords: ['cách từ chối', 'làm sao để từ chối', 'mẫu câu từ chối', 'nói gì khi bị rủ', 'tu choi ma tuy'],
            response: "**Mẫu câu từ chối thông minh (Không cần giải thích dài dòng):**\n" +
                      "- 'Không, mình không dùng thứ này.'\n" +
                      "- 'Mình không biết nó là gì nên mình sẽ không sử dụng.'\n" +
                      "- 'Tớ phải về ngay, tớ không tham gia đâu.'\n" +
                      "**Lời khuyên**: Bạn hãy dứt khoát rời khỏi nơi đó ngay lập tức. Từ chối và rời đi là lựa chọn bản lĩnh nhất!"
        },
        {
            id: "friend_advice",
            keywords: ['bạn em sử dụng ma túy', 'khuyên bạn nghiện', 'sợ mất bạn', 'giúp bạn mình'],
            response: "**Nếu bạn thân rủ dùng ma túy:**\n" +
                      "- Đừng vì sợ mất bạn mà thử. Bạn tốt sẽ không bao giờ đẩy bạn vào con đường chết.\n" +
                      "- Hãy khuyên bạn: 'Thứ này nguy hiểm lắm, bạn nên dừng lại'.\n" +
                      "- **Quan trọng**: Hãy bí mật báo với thầy cô hoặc cha mẹ bạn ấy để người lớn giúp đỡ kịp thời. Đừng im lặng, đó mới là giúp bạn!"
        },
        {
            id: "online_safety",
            keywords: ['ma túy trên mạng', 'quảng cáo an toàn', 'không gây nghiện', 'báo cáo nội dung xấu'],
            response: "**Cảnh giác trên mạng xã hội:**\n" +
                      "- Không tin vào lời quảng cáo: 'Chất này an toàn tuyệt đối', 'Không gây nghiện' hay 'Thử một lần không sao'. Đó đều là lời lừa đảo!\n" +
                      "- Không mua hoặc chia sẻ các sản phẩm nghi ngờ chất gây nghiện trên mạng.\n" +
                      "- Khi thấy nội dung đáng ngờ: Hãy nhấn nút **BÁO CÁO (Report)** trên ứng dụng và báo cho người lớn."
        },
        {
            id: "role_home_school",
            keywords: ['vai trò gia đình', 'nhà trường làm gì', 'bố mẹ cần làm gì', 'tin tưởng con cái'],
            response: "**Gia đình và Nhà trường luôn bên bạn:**\n" +
                      "- **Gia đình**: Bố mẹ hãy lắng nghe con mà không phán xét, xây dựng sự tin tưởng để con dám chia sẻ sự thật.\n" +
                      "- **Nhà trường**: Là nơi cung cấp kỹ năng, tư vấn và bảo vệ bạn trong môi trường học tập lành mạnh.\n" +
                      "Đừng bao giờ ngại tìm kiếm sự giúp đỡ từ thầy cô và cha mẹ nhé!"
        },
        {
            id: "chatbot_reminders",
            keywords: ['nhắc nhở học sinh', 'điều cần nhớ', 'chatbot nhắc gì', 'loi nhac an toan'],
            response: "**6 Điều Trợ lý AI nhắc bạn mỗi ngày:**\n" +
                      "1. Không thử dù chỉ 1 lần vì tò mò.\n" +
                      "2. Không nhận quà, chất lạ từ người không rõ nguồn gốc.\n" +
                      "3. Không giữ hộ, vận chuyển vật nghi ngờ là ma túy.\n" +
                      "4. Không tin mọi thông tin quảng cáo 'phê' trên mạng.\n" +
                      "5. Không kỳ thị người đang gặp vấn đề về chất gây nghiện.\n" +
                      "6. Khi gặp nguy hiểm, hãy tìm người lớn tin cậy ngay!"
        },
        {
            id: "study_impact_detail",
            keywords: ['ma túy có ảnh hưởng việc học không', 'học tập sút kém', 'mat tap trung'],
            response: "**Ma túy phá hủy việc học thế nào?**\n" +
                      "- Nó làm chết tế bào não, khiến bạn **mất trí nhớ** và không thể tập trung nghe giảng.\n" +
                      "- Kết quả học tập sẽ tụt dốc không phanh, dẫn đến chán học, bỏ học.\n" +
                      "- Bạn sẽ mất đi cơ hội vào những trường tốt và hỏng cả tương lai nghề nghiệp sau này."
        },
// --- BỔ SUNG: NHÓM NGUY CƠ, HẬU QUẢ VÀ CÁC KÊNH TRỢ GIÚP CHI TIẾT (KEY DUY NHẤT) ---
        {
            id: "vulnerable_groups",
            keywords: ['ai dễ bị lôi kéo', 'mục tiêu của kẻ xấu', 'nhóm học sinh nguy cơ', 'ai dễ nghiện nhất', 'tâm lý buồn chán'],
            response: "**Những nhóm học sinh dễ trở thành 'mục tiêu' của tội phạm ma túy:**\n\n" +
                      "1. **Thiếu kiến thức**: Các bạn cả tin, thiếu kỹ năng phòng vệ và chưa hiểu rõ tác hại của ma túy mới.\n" +
                      "2. **Lối sống đua đòi**: Những bạn thần tượng cuộc sống ăn chơi, thích kết giao với các đối tượng tiêu cực.\n" +
                      "3. **Hoàn cảnh gia đình**: Con nhà khá giả nhưng cha mẹ bận rộn, thiếu sự quan tâm, hoặc các bạn có gia đình không trọn vẹn (ly hôn, đơn thân) thường mang tâm lý mặc cảm, dễ bị lợi dụng."
        },
        {
            id: "student_drug_consequences",
            keywords: ['hậu quả khi dính vào', 'bị dụ dỗ thì sao', 'tác hại lâu dài', 'nguy cơ tử vong', 'bệnh xã hội'],
            response: "**Hậu quả khôn lường khi học sinh bị dụ dỗ sử dụng ma túy:**\n\n" +
                      "• **Tính mạng**: Nguy cơ sốc thuốc, ngộ độc cấp tính và tử vong bất ngờ.\n" +
                      "• **Trí tuệ**: Suy giảm trí nhớ và khả năng tập trung, kết quả học tập sụp đổ hoàn toàn.\n" +
                      "• **Sức khỏe**: Dễ lây nhiễm các bệnh nguy hiểm như HIV/AIDS, viêm gan B thông qua việc dùng chung kim tiêm hoặc mất kiểm soát hành vi.\n" +
                      "• **Pháp lý**: Bạn có thể bị truy cứu trách nhiệm hình sự nếu lôi kéo người khác hoặc tham gia vận chuyển, mua bán trái phép."
        },
        {
            id: "professional_help_psd",
            keywords: ['viện psd', 'hotline psd', 'số điện thoại psd', '0358589616', 'tư vấn cai nghiện'],
            response: "**Kênh hỗ trợ chuyên sâu:**\n\n" +
                      "Nếu bạn hoặc người thân cần sự trợ giúp chuyên môn, hãy gọi ngay tới số Hotline của **Viện PSD**: \n" +
                      "📞 **0358.589.616** \n\n" +
                      "Đây là nơi tư vấn, hỗ trợ kịp thời và giúp bạn tìm ra giải pháp an toàn nhất để thoát khỏi cạm bẫy ma túy."
        },
        {
            id: "firm_refusal_skills",
            keywords: ['giữ vững lập trường', 'từ chối bạn thân', 'từ chối người quen', 'xử lý khéo léo', 'tránh xa quan hệ xấu'],
            // response: "Nói 'KHÔNG' với ma túy dù người mời gọi là ai (kể cả bạn thân hay người thân). Nếu người dụ dỗ là bạn bè: Hãy từ chối dứt khoát và báo ngay cho người lớn. Nếu là người lạ tại tiệc tùng: Từ chối khéo léo để tránh kích động, sau đó nhanh chóng rời khỏi nơi nguy hiểm."
            response: "**Kỹ năng xử lý khi bị dụ dỗ:**\n\n" +
                      "• **Giữ vững lập trường**: Luôn nói 'KHÔNG' dù người mời là bạn thân hay người quen.\n" +
                      "• **Xử lý khéo léo**: Với người lạ tại các buổi tiệc, hãy từ chối lịch sự để tránh gây kích động, sau đó tìm cách rời đi thật nhanh.\n" +
                      "• **Chọn bạn mà chơi**: Tuyệt đối không tụ tập với nhóm người có biểu hiện bất thường hoặc từng sử dụng chất cấm."
        },
        {
            id: "action_prevention_plan",
            keywords: ['học sinh nên làm gì', 'phải trang bị gì', 'phòng chống thế nào cho đúng', 'kiem soat cam xuc'],
            response: "**Kế hoạch hành động để luôn an toàn:**\n\n" +
                      "1. **Cập nhật kiến thức**: Luôn tìm hiểu về các loại ma túy trá hình mới nhất qua trang tin chính thống.\n" +
                      "2. **Rèn luyện kỹ năng**: Tập cách kiểm soát cảm xúc, không để sự buồn chán hay tò mò dẫn lối.\n" +
                      "3. **Chủ động chia sẻ**: Khi gặp tình huống đáng ngờ, hãy báo ngay cho gia đình, thầy cô hoặc công an địa phương. Sự giúp đỡ kịp thời sẽ ngăn chặn mọi hậu quả xấu."
        },
// --- BỔ SUNG: MA TÚY TỰ CHẾ (KEO CHÓ & MA TÚY CÁ SẤU) - KEY DUY NHẤT ---
        {
            id: "homemade_glue_dog",
            keywords: ['keo chó', 'keo cho', 'dog x66', 'hít keo', 'hít xăng', 'dung môi hữu cơ', 'vỏ keo lạ'],
            response: "**Keo chó (Dog X66) - Cái chết được hít vào:**\n\n" +
                      "- **Nhận diện**: Là loại keo công nghiệp dán gỗ, giày dép. Kẻ xấu pha với xăng, sơn để tạo chất gây nghiện. Khi hít, nó phát tán các chất độc như Methylen clorid, Toluene...\n" +
                      "- **Tác hại kinh hoàng**:\n" +
                      "  1. **Hủy hoại não bộ**: Tế bào thần kinh bị chết không thể phục hồi, gây lú lẫn, sa sút trí tuệ.\n" +
                      "  2. **Ảo giác bạo lực**: Người dùng thường hoang tưởng, dễ xâm hại bản thân và người khác.\n" +
                      "  3. **Hỏng nội tạng**: Gây viêm gan hoại tử, suy tim, suy phổi và đột tử.\n" +
                      "**Cảnh báo**: Nếu thấy vỏ keo lạ trong cặp sách hoặc dưới gầm giường, bạn cần báo ngay cho người lớn bảo vệ."
        },
        {
            id: "homemade_krokodil",
            keywords: ['ma túy cá sấu', 'ma tuy ca sau', 'krokodil', 'ma túy ăn thịt người', 'thối rữa cơ thể', 'vảy cá sấu', 'xác sống'],
            response: "**Ma túy Cá sấu (Krokodil) - Tử thần ăn mòn thể xác:**\n\n" +
                      "- **Nhận diện**: Tự chế từ thuốc ho Codeine trộn xăng, phốt pho, i-ốt... tạo dung dịch màu caramen. \n" +
                      "- **Tác hại kinh hoàng**:\n" +
                      "  1. **Thối rữa cơ thể**: Đúng nghĩa 'ma túy ăn thịt người', da thịt người nghiện bị hoại tử, lở loét để lộ cả xương, da sần sùi như vảy cá sấu.\n" +
                      "  2. **Vô cảm**: Người nghiện mất hết nhân tính, ánh mắt trống rỗng như một 'xác sống' (zombie).\n" +
                      "  3. **Tuổi thọ ngắn**: Người nghiện loại này thường chỉ sống thêm được từ 2 - 3 năm.\n" +
                      "  4. **Cực khó cai**: Cơn đau khi cai Krokodil kéo dài cả tháng, khủng khiếp hơn heroin nhiều lần."
        },
        {
            id: "homemade_labor_warning",
            keywords: ['xưởng gỗ', 'xưởng giày', 'ngửi mùi keo dán', 'khẩu trang chuyên dụng'],
            response: "**Cảnh báo trong lao động**: Ngay cả khi không sử dụng ma túy, nếu bạn làm việc trong môi trường xưởng gỗ, xưởng giày dép có nhiều hơi keo dán, bạn phải luôn đeo khẩu trang chuyên dụng. Việc hít phải hơi keo công nghiệp lâu ngày sẽ dẫn đến lệ thuộc và ngộ độc mãn tính cực kỳ nguy hiểm cho hệ thần kinh!"
        },
// --- BỔ SUNG: THÁI ĐỘ ỨNG XỬ & XỬ TRÍ CẤP CỨU SỐC MA TÚY (ND CHO HỌC SINH) ---
        {
            id: "stigma_vs_help",
            keywords: ['kỳ thị', 'ky thi', 'ghét người nghiện', 'giúp đỡ người nghiện', 'đối xử với người dùng ma túy', 'tại sao bị kỳ thị'],
            response: "**Giúp đỡ hay Kỳ thị người sử dụng ma túy?**\n\n" +
                      "• **Kỳ thị là gì?** Là hành động đánh giá tiêu cực, xa lánh người lầm lỡ. Điều này chỉ làm họ tổn thương, mất lòng tự trọng và khó quay lại con đường sáng.\n" +
                      "• **Tại sao không nên kỳ thị?** Vì 'Nhân vô thập toàn', ai cũng có thể mắc sai lầm. Sự kỳ thị đẩy họ vào bóng tối, khiến họ ngại tìm kiếm sự giúp đỡ y tế và dễ tái nghiện.\n" +
                      "• **Bạn nên làm gì?** Hãy chọn thấu hiểu và cảm thông. Hãy động viên họ kiên trì cai nghiện và giúp họ hòa nhập cộng đồng bằng ánh mắt không phán xét. Sự giúp đỡ chân thành chính là cánh cửa phục hồi duy nhất!"
        },
        {
            id: "overdose_recognition",
            keywords: ['biểu hiện sốc ma túy', 'ngộ độc ma túy', 'quá liều', 'dấu hiệu sốc thuốc', 'ngất xỉu do ma túy'],
            response: "**Nhận diện người bị Sốc / Ngộ độc ma túy:**\n\n" +
                      "1. **Nhóm Heroin/Thuốc phiện**: Co giật, lơ mơ, hôn mê; Đồng tử co nhỏ xíu, da tái xanh, người lạnh toát, thở rất chậm hoặc ngừng thở.\n" +
                      "2. **Nhóm Ma túy đá/Kẹo/Ke**: Thân nhiệt tăng cao đột ngột, run rẩy, sùi bọt mép; Tâm trạng hung hãn, kích động hoặc hoảng loạn cực độ.\n" +
                      "**Cảnh báo**: Đây là tình trạng nguy kịch tính mạng, cần được cứu chữa ngay lập tức!"
        },
        {
            id: "emergency_action_thcs",
            keywords: ['học sinh thcs làm gì khi thấy người sốc', 'cấp cứu sốc ma túy cấp 2', 'thấy người ngộ độc ma túy'],
            response: "**Hành động dành cho học sinh THCS (Cấp 2) khi thấy người sốc ma túy:**\n\n" +
                      "1. **Bình tĩnh**: Không hoảng sợ chạy loạn.\n" +
                      "2. **Hô hoán**: Gọi thật to để người lớn xung quanh biết ngay.\n" +
                      "3. **Gọi 115**: Cung cấp địa chỉ và tình trạng nạn nhân (ví dụ: 'Có người đang co giật, sùi bọt mép tại cổng trường').\n" +
                      "4. **Tuyệt đối KHÔNG**: Không lay gọi mạnh, không tát vào mặt hay dội nước vào nạn nhân vì có thể khiến tim họ ngừng đập ngay lập tức!"
        },
        {
            id: "emergency_action_thpt",
            keywords: ['học sinh thpt làm gì khi gặp người sốc', 'sơ cứu sốc ma túy', 'giúp người bị quá liều'],
            response: "**Hành động dành cho học sinh THPT (Cấp 3) khi gặp người sốc ma túy:**\n\n" +
                      "1. **Gọi khẩn cấp 115**: Thông báo địa điểm chính xác.\n" +
                      "2. **Hỗ trợ đường thở**: Nới lỏng quần áo cho nạn nhân dễ thở. Nếu miệng mũi có vật cản (đờm, dãi), hãy giúp làm sạch.\n" +
                      "3. **Theo dõi**: Không bỏ mặc nạn nhân một mình. Tìm thêm sự hỗ trợ từ người lớn.\n" +
                      "4. **Sơ cứu**: Nếu bạn đã được đào tạo y tế trường học, có thể thực hiện hô hấp nhân tạo trong khi chờ xe cứu thương.\n" +
                      "**Ghi nhớ**: Sự bình tĩnh của bạn có thể cứu sống một mạng người!"
        },
        {
            id: "overdose_consequences",
            keywords: ['hậu quả sốc ma túy', 'đột quỵ vì ma túy', 'suy hô hấp', 'trụy tim'],
            response: "**Hậu quả kinh hoàng khi sốc ma túy:**\n" +
                      "- Suy hô hấp cấp, trụy tim mạch.\n" +
                      "- Xuất huyết não, đột quỵ dẫn đến liệt hoặc tử vong.\n" +
                      "- Hôn mê sâu và để lại di chứng thần kinh vĩnh viễn nếu may mắn sống sót.\n" +
                      "- Mất kiểm soát hành vi gây tổn thương cho chính mình và người xung quanh."
        },
// --- BỔ SUNG: CÁC TỘI PHẠM VỀ MA TÚY (BỘ LUẬT HÌNH SỰ 2015, SỬA ĐỔI 2017) ---
        {
            id: "crime_cultivation",
            keywords: ['tội trồng cây ma túy', 'trồng cần sa bị phạt thế nào', 'd247', 'điều 247', 'trồng thuốc phiện'],
            response: "**Tội trồng cây thuốc phiện, côca, cần sa (Điều 247):**\n" +
                      "- **Phạt tù từ 06 tháng đến 03 năm**: Nếu đã được giáo dục 2 lần, hoặc đã bị xử phạt hành chính/kết án tội này mà còn vi phạm, hoặc trồng từ 500 đến dưới 3.000 cây.\n" +
                      "- **Phạt tù từ 03 năm đến 07 năm**: Nếu có tổ chức, hoặc trồng từ 3.000 cây trở lên, hoặc tái phạm nguy hiểm.\n" +
                      "**Lưu ý**: Nếu tự nguyện phá bỏ và giao nộp trước khi thu hoạch thì có thể được miễn trách nhiệm hình sự."
        },
        {
            id: "crime_production",
            keywords: ['tội sản xuất ma túy', 'chế tạo ma túy bị tội gì', 'd248', 'điều 248', 'làm ra ma túy'],
            response: "**Tội sản xuất trái phép chất ma túy (Điều 248) - Cực kỳ nghiêm trọng:**\n" +
                      "- **Mức thấp nhất**: Phạt tù từ 02 năm đến 07 năm.\n" +
                      "- **Mức cao nhất**: Phạt tù 20 năm, tù chung thân hoặc **TỬ HÌNH**.\n" +
                      "Hình phạt cao nhất áp dụng khi sản xuất khối lượng lớn (ví dụ: trên 100g Heroine/Ma túy đá) hoặc có tổ chức, tính chất chuyên nghiệp."
        },
        {
            id: "crime_possession",
            keywords: ['tàng trữ ma túy', 'cất giấu ma túy bị phạt thế nào', 'd249', 'điều 249', 'giữ ma túy'],
            response: "**Tội tàng trữ trái phép chất ma túy (Điều 249):**\n" +
                      "- **Phạt tù từ 01 năm đến 05 năm**: Với khối lượng nhỏ (dưới 5g Heroine/Đá) hoặc đã bị xử phạt hành chính mà còn vi phạm.\n" +
                      "- **Phạt tù cao nhất**: 15 năm đến 20 năm hoặc **TÙ CHUNG THÂN** khi tàng trữ khối lượng lớn (trên 100g Heroine/Đá).\n" +
                      "**Cảnh báo**: Tàng trữ không nhằm mục đích mua bán vẫn bị đi tù rất nặng!"
        },
        {
            id: "crime_transport",
            keywords: ['vận chuyển ma túy', 'ship ma túy bị tội gì', 'd250', 'điều 250', 'mang hộ ma túy'],
            response: "**Tội vận chuyển trái phép chất ma túy (Điều 250):**\n" +
                      "- **Mức thấp nhất**: Phạt tù từ 02 năm đến 07 năm.\n" +
                      "- **Mức cao nhất**: Phạt tù 20 năm, tù chung thân hoặc **TỬ HÌNH**.\n" +
                      "**Lời khuyên**: Đừng bao giờ nhận 'cầm hộ' hay 'ship hộ' đồ vật không rõ nguồn gốc qua biên giới hoặc bến xe, bạn có thể đối mặt với án tử hình!"
        },
        {
            id: "crime_trading",
            keywords: ['mua bán ma túy', 'bán ma túy bị phạt thế nào', 'd251', 'điều 251', 'buôn ma túy'],
            response: "**Tội mua bán trái phép chất ma túy (Điều 251):**\n" +
                      "- **Phạt tù từ 02 năm đến 07 năm**: Cho hành vi mua bán thông thường.\n" +
                      "- **Phạt tù cao nhất**: 20 năm, tù chung thân hoặc **TỬ HÌNH**.\n" +
                      "- **Tình tiết tăng nặng**: Bán ma túy cho người dưới 16 tuổi, hoặc sử dụng trẻ em vào việc mua bán sẽ bị xử phạt rất nghiêm khắc."
        },
        {
            id: "crime_appropriation",
            keywords: ['chiếm đoạt chất ma túy', 'ăn trộm ma túy', 'cướp ma túy', 'd252', 'điều 252'],
            response: "**Tội chiếm đoạt chất ma túy (Điều 252):**\n" +
                      "- Hình phạt từ **01 năm tù đến Tù chung thân** tùy thuộc vào khối lượng chiếm đoạt và tính chất hành vi (trộm cắp, lừa đảo, cướp giật chất ma túy)."
        },
        {
            id: "crime_precursors",
            keywords: ['tội về tiền chất', 'mua bán tiền chất', 'd253', 'điều 253', 'chiếm đoạt tiền chất'],
            response: "**Tội liên quan đến tiền chất ma túy (Điều 253):**\n" +
                      "- Các hành vi tàng trữ, vận chuyển, mua bán hoặc chiếm đoạt tiền chất để sản xuất ma túy bị phạt tù từ **01 năm đến Tù chung thân**."
        },
        {
            id: "crime_tools",
            keywords: ['dụng cụ sản xuất ma túy', 'mua bán bình hút', 'd254', 'điều 254', 'phương tiện dùng ma túy'],
            response: "**Tội sản xuất, tàng trữ, vận chuyển, mua bán dụng cụ dùng vào việc sản xuất/sử dụng ma túy (Điều 254):**\n" +
                      "- Phạt tù từ **01 năm đến 05 năm** (nếu có từ 6 đến 19 đơn vị dụng cụ).\n" +
                      "- Phạt tù từ **05 năm đến 10 năm** (nếu có từ 20 đơn vị dụng cụ trở lên hoặc vận chuyển qua biên giới)."
        },
        {
            id: "crime_organizing",
            keywords: ['tổ chức sử dụng ma túy', 'bay lắc bị phạt thế nào', 'd255', 'điều 255', 'mở tiệc ma túy'],
            response: "**Tội tổ chức sử dụng trái phép chất ma túy (Điều 255):**\n" +
                      "- **Mức thấp nhất**: Phạt tù từ 02 năm đến 07 năm.\n" +
                      "- **Phạt tù từ 15 năm đến 20 năm**: Nếu tổ chức cho người dưới 13 tuổi sử dụng hoặc làm chết người.\n" +
                      "- **Mức cao nhất**: 20 năm hoặc **TÙ CHUNG THÂN** nếu làm chết 02 người trở lên."
        },
        {
            id: "crime_harboring",
            keywords: ['tội chứa chấp sử dụng', 'cho thuê nhà dùng ma túy', 'd256', 'điều 256', 'biết dùng ma túy mà cho mượn chỗ'],
            response: "**Tội chứa chấp việc sử dụng trái phép chất ma túy (Điều 256):**\n" +
                      "- Người nào cho thuê, cho mượn địa điểm để người khác sử dụng ma túy bị phạt tù từ **02 năm đến 07 năm**.\n" +
                      "- Nếu phạm tội đối với người dưới 16 tuổi hoặc phạm tội 02 lần trở lên, phạt tù từ **07 năm đến 15 năm**."
        },
        {
            id: "crime_forcing",
            keywords: ['cưỡng bức sử dụng ma túy', 'ép người khác dùng ma túy', 'd257', 'điều 257'],
            response: "**Tội cưỡng bức người khác sử dụng trái phép chất ma túy (Điều 257):**\n" +
                      "- Dùng vũ lực hoặc đe dọa để ép người khác dùng ma túy bị phạt tù từ **02 năm đến 07 năm**.\n" +
                      "- Nếu làm chết 02 người trở lên, hình phạt là 20 năm hoặc **TÙ CHUNG THÂN**."
        },
        {
            id: "crime_enticing",
            keywords: ['lôi kéo sử dụng ma túy', 'rủ rê dùng ma túy', 'd258', 'điều 258', 'xúi giục dùng ma túy'],
            response: "**Tội lôi kéo người khác sử dụng trái phép chất ma túy (Điều 258):**\n" +
                      "- Rủ rê, dụ dỗ người khác dùng ma túy bị phạt tù từ **01 năm đến 05 năm**.\n" +
                      "- Nếu lôi kéo người dưới 13 tuổi, phạt tù từ **10 năm đến 15 năm**.\n" +
                      "- Nếu gây chết 02 người trở lên, hình phạt là 20 năm hoặc **TÙ CHUNG THÂN**."
        },
        {
            id: "crime_violation_mgmt",
            keywords: ['vi phạm quy định quản lý', 'd259', 'điều 259', 'cấp phát ma túy sai'],
            response: "**Tội vi phạm quy định về quản lý chất ma túy, tiền chất, thuốc gây nghiện (Điều 259):**\n" +
                      "- Áp dụng cho người có trách nhiệm quản lý mà vi phạm quy định về xuất nhập khẩu, sản xuất, giao nhận ma túy. Hình phạt từ **phạt tiền 10 triệu đồng đến 10 năm tù**."
        },
// --- BỔ SUNG: CHUYÊN ĐỀ "GIÚP ĐỠ HAY KỲ THỊ" (KEY DUY NHẤT) ---
        {
            id: "stigma_definition",
            keywords: ['kỳ thị là gì', 'thế nào là kỳ thị', 'ky thi la gi', 'xa lánh người nghiện'],
            response: "**Kỳ thị là gì?**\n\nKỳ thị là hành động đánh giá tiêu cực và xa lánh một cá nhân hoặc một nhóm người nào đó. Khi kỳ thị người sử dụng ma túy, chúng ta vô tình đẩy họ ra khỏi cộng đồng, khiến họ bị cô lập và tổn thương sâu sắc. Sự kỳ thị chỉ làm vấn đề tồi tệ hơn, còn sự giúp đỡ chân thành mới là con đường phục hồi duy nhất."
        },
        {
            id: "stigma_consequences",
            keywords: ['hậu quả của kỳ thị', 'tại sao không nên kỳ thị', 'người nghiện bị ghét thì sao', 'mất lòng tự trọng'],
            response: "**Hậu quả của sự kỳ thị đối với người sử dụng ma túy:**\n\n" +
                      "1. **Mất lòng tự trọng**: Họ cảm thấy bị khinh rẻ, mất niềm tin vào chính mình và không còn động lực để thay đổi.\n" +
                      "2. **Gia tăng hành vi tiêu cực**: Khi bị xã hội bỏ rơi, họ dễ tìm đến các nhóm xấu và phạm tội nghiêm trọng hơn.\n" +
                      "3. **Cản trở phục hồi**: Vì sợ bị cười chê, họ ngại tìm đến các dịch vụ y tế và hỗ trợ cai nghiện.\n" +
                      "4. **Vòng xoáy tái nghiện**: Thiếu cơ hội việc làm và sự cảm thông khiến họ dễ rơi lại vào con đường cũ."
        },
        
        {
            id: "stigma_reasons",
            keywords: ['tại sao bị kỳ thị', 'lý do bị xã hội xa lánh', 'phá vỡ chuẩn mực'],
            response: "**Tại sao người sử dụng ma túy thường bị kỳ thị?**\n\n" +
                      "Sự kỳ thị thường đến từ nỗi sợ hãi về những hệ lụy của ma túy như: phá vỡ chuẩn mực đạo đức, gây hại sức khỏe, nguy cơ tội phạm (trộm cướp) và các bệnh truyền nhiễm. Tuy nhiên, chúng ta cần phân biệt giữa việc **lên án hành vi dùng ma túy** và việc **ghét bỏ bản thân con người họ**. Lên án cái xấu nhưng hãy bao dung với người muốn sửa sai bạn nhé!"
        },
    ];

    // Logic xử lý thông minh
    function generateSmartResponse(userQuery) {
        const query = userQuery.toLowerCase().trim();

        // 1. Chống các câu hỏi vi phạm pháp luật
       if (query.includes('mua ở đâu') || query.includes('bán ở đâu') || query.includes('cách pha chế') || query.includes('chế tạo ma túy')) {
            return "Tôi không thể cung cấp thông tin vi phạm pháp luật. Mọi hành vi mua bán, sản xuất ma túy đều bị xử lý hình sự rất nặng theo quy định hiện hành.";
        }

        // 2. Thuật toán tìm kiếm theo trọng số từ đơn
        const userWords = query.split(/\s+/).filter(w => w.length > 1); // Tách câu hỏi thành các từ
        let bestMatch = null;
        let highestScore = 0;

        KB.forEach(item => {
            let score = 0;
            item.keywords.forEach(kw => {
                const kwLower = kw.toLowerCase();
                
                // CỘNG ĐIỂM: Nếu khớp cả cụm (Ưu tiên cao nhất)
                if (query.includes(kwLower) || kwLower.includes(query)) {
                    score += 50; 
                }

                // CỘNG ĐIỂM: Nếu khớp từng từ đơn lẻ trong từ khóa
                userWords.forEach(word => {
                    if (kwLower.includes(word)) {
                        score += 10;
                    }
                });
            });

            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        });

        // 3. Trả về kết quả nếu tìm thấy mục có điểm cao
        // (Ngưỡng 15 điểm để tránh trả lời sai lệch khi gõ từ linh tinh)
        if (bestMatch && highestScore >= 15) {
            return bestMatch.response;
        }

        // 4. Nếu hỏi quá ngắn hoặc không tìm thấy (Fallback)
        return "Xin lỗi, tôi chưa hiểu rõ ý bạn do câu hỏi hơi vắn tắt. Có phải bạn muốn hỏi về **Luật 2025**, **Tác hại ma túy**, hay **Hướng dẫn vào học** không? Bạn hãy gõ rõ hơn một chút để tôi tìm trong tài liệu nhé!";
    }

    // GIAO DIỆN CHATBOT XANH LÁ MÁT MẮT (#059669) VỚI HIỆU ỨNG PHẬP PHỒNG (PULSE)
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse-green {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { transform: scale(1.08); box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        #ai-chatbot-launcher {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            width: 62px;
            height: 62px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
            border: 2px solid #ffffff;
            transition: transform 0.3s;
            animation: pulse-green 2.2s infinite ease-in-out;
        }
        #ai-chatbot-launcher:hover {
            transform: scale(1.12);
        }

        #ai-chatbot-container {
            position: fixed;
            bottom: 92px;
            right: 20px;
            z-index: 10000;
            width: 410px;
            max-width: 90vw;
            height: 560px;
            max-height: 82vh;
            background: #ffffff;
            border-radius: 18px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.18);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #a7f3d0;
            font-family: 'Segoe UI', Arial, sans-serif;
            animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes popIn {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ai-header {
            background: linear-gradient(135deg, #059669, #047857);
            color: #ffffff;
            padding: 14px 18px;
            font-weight: bold;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .ai-body {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background: #f0fdf4;
            display: flex;
            flex-direction: column;
            gap: 12px;
            scroll-behavior: smooth;
        }
        .ai-msg {
            padding: 12px 15px;
            border-radius: 16px;
            font-size: 13.5px;
            line-height: 1.6;
            max-width: 86%;
            word-wrap: break-word;
        }
        .ai-msg.bot {
            background: #ffffff;
            color: #1f2937;
            align-self: flex-start;
            border-bottom-left-radius: 3px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04);
            border: 1px solid #dcfce7;
            white-space: pre-wrap;
        }
        .ai-msg.user {
            background: #10b981;
            color: #ffffff;
            align-self: flex-end;
            border-bottom-right-radius: 3px;
            box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
        }
        .ai-footer {
            padding: 12px;
            background: #ffffff;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 8px;
        }
        .ai-input {
            flex: 1;
            border: 1px solid #a7f3d0;
            border-radius: 22px;
            padding: 10px 16px;
            outline: none;
            font-size: 13.5px;
            transition: border-color 0.2s;
        }
        .ai-input:focus {
            border-color: #059669;
        }
        .ai-send {
            background: #059669;
            color: #ffffff;
            border: none;
            padding: 0 20px;
            border-radius: 22px;
            cursor: pointer;
            font-weight: bold;
            font-size: 13.5px;
            transition: background 0.2s;
        }
        .ai-send:hover {
            background: #047857;
        }
    `;
    document.head.appendChild(style);

    // TẠO GIAO DIỆN DOM
    const launcher = document.createElement('div');
    launcher.id = 'ai-chatbot-launcher';
    launcher.title = 'Mở Trợ lý AI';
    launcher.innerHTML = `<span style="font-size:32px">🤖</span>`;

    const container = document.createElement('div');
    container.id = 'ai-chatbot-container';
    container.innerHTML = `
        <div class="ai-header">
            <div style="display:flex; align-items:center; gap:10px">
                <span style="font-size:22px">🤖</span>
                <span>${ASSISTANT_NAME}</span>
            </div>
            <span id="ai-close" style="cursor:pointer; font-size:24px; opacity:0.9">&times;</span>
        </div>
        <div class="ai-body" id="ai-body">
            <div class="ai-msg bot">Chào bạn! Tôi là Trợ lý AI. Tôi đã được cập nhật đầy đủ kiến thức về Luật 2025, 30 tình huống thực tế và các loại ma túy mới. Bạn cần tôi hỗ trợ thông tin gì?</div>
        </div>
        <div class="ai-footer">
            <input type="text" class="ai-input" id="ai-input" placeholder="Gõ câu hỏi của bạn..." />
            <button class="ai-send" id="ai-send">Gửi</button>
        </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(container);

    const body = container.querySelector('#ai-body');
    const input = container.querySelector('#ai-input');
    const send = container.querySelector('#ai-send');

    launcher.onclick = () => {
        const isOpening = container.style.display !== 'flex';
        container.style.display = isOpening ? 'flex' : 'none';
        if (isOpening) {
            input.focus();
            playTingSound(); // Phát âm thanh Ting Teng phập phồng nhẹ khi mở
        }
    };

    container.querySelector('#ai-close').onclick = () => container.style.display = 'none';

    function addMessage(role, text) {
        const msg = document.createElement('div');
        msg.className = `ai-msg ${role}`;
        msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        addMessage('user', text);
        input.value = '';
        setTimeout(() => { addMessage('bot', generateSmartResponse(text)); }, 250);
    }

    send.onclick = handleSend;
    input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };

    // Phát âm thanh ting teng khởi tạo nhẹ khi tải xong bài học sau 1.5s
    setTimeout(() => {
        playTingSound();
    }, 1500);
})();