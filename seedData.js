import User from './models/user'
import Cooperative from './models/cooperative'
import Mangotree from './models/tree'
import Purchase from './models/purchase.history'
import fs from 'fs'
import path from 'path'
export const removeData = async () => {
  await User.deleteMany({}, function (_err, numberRemoved) {
    console.log(' Delete all User ' + numberRemoved)
  })
  await Cooperative.deleteMany({}, function (_err, numberRemoved) {
    console.log(' Delete all Cooperative ' + numberRemoved)
  })
  await Mangotree.deleteMany({}, function (_err, numberRemoved) {
    console.log(' Delete all Mangotree ' + numberRemoved)
  })
  await Purchase.deleteMany({}, function (_err, numberRemoved) {
    console.log(' Delete all Purchase ' + numberRemoved)
  })
}

export const createData = async () => {
  await new Promise((resolve, reject) => {
    let data = fs.readFileSync(path.resolve(path.join(__dirname, './assets/user.jpg')))
    const logo = data.toString('base64')
    const currentUser = {
      avatar: logo,
      phoneNumber: '2',
      active: true,
      verify: true,
      rand: 79045,
      firstName: 'Cao',
      lastName: 'Phuc',
      dateOfBirth: '2011-10-01T17:00:00.000Z',
      email: 'caophuc799@gmail.com',
      address: 'KTX',
      password: 'hello'
    }
    let data1 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/htx1.png')))
    const logo1 = data1.toString('base64')
    let data2 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/htx3.jpeg')))
    const logo2 = data2.toString('base64')
    let data4 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/htx4.jpg')))
    const logo4 = data4.toString('base64')
    let data5 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/htx2.jpeg')))
    const logo5 = data5.toString('base64')
    User.create(currentUser, (_error, _user) => {
      const currentCooperative = [{
        // logo: 'QmXZiBbFk2Xhyuzdoqvr869HkKg9JhCSpnkwqHcJj9gAfy',
        logo: logo1,
        active: true,
        verify: true,
        rand: 0,
        idRepresentation: _user._id,
        taxCode: '1234123',
        name: 'HTX Cao Lãnh',
        description: 'Hợp tác xã dịch vụ nông nghiệp Mỹ Hiệp có hơn 209 thành viên đăng ký tham gia, với số vốn góp gần 550 triệu đồng. Hội nghị đã bầu ra Ban quản trị gồm 3 thành viên, ông Võ Văn Dứt được tín nhiệm bầu làm Chủ tịch Hội đồng quản trị.',
        email: 'caophuc799@gmail.com',
        phoneNumber: '012366885',
        address: 'thanh hoa',
        password: 'hello'
      },
      {
        // logo: 'QmRW8o6fKarhurk3BDFGoqn5PR1Mi9z7Yb9H8t8Ur9zxYC',
        logo: logo2,
        active: true,
        verify: true,
        rand: 0,
        idRepresentation: _user._id,
        taxCode: '1234125',
        name: 'Xoài cam lâm',
        description: 'Hợp tác xã dịch vụ và sản xuất nông nghiệp Phước Cát được thành lập năm 2012, ở tại Cát Lâm 3 - thị trấn Phước Cát, với 16 thành viên do ..',
        email: 'caophuc7992@gmail.com',
        phoneNumber: '012366885',
        address: 'thanh hoa',
        password: 'hello'
      },
      {
        // logo: 'QmUkadaYGmSnr6QxfJgF6tbPzx6aMpEXhbuzHBpbr253D8',
        logo: logo4,
        active: true,
        verify: true,
        rand: 0,
        idRepresentation: _user._id,
        taxCode: '1204123',
        name: 'Xoài cát tiền giang',
        description: 'Xoài cát tiền giang',
        email: 'caophuc7993@gmail.com',
        phoneNumber: '012366885',
        address: 'thanh hoa',
        password: 'hello'
      },
      {
        // logo: 'QmXZiBbFk2Xhyuzdoqvr869HkKg9JhCSpnkwqHcJj9gAfy',
        logo: logo5,
        active: true,
        verify: true,
        rand: 0,
        idRepresentation: _user._id,
        taxCode: '1534123',
        name: 'HTX Sáu xoài',
        email: 'caophuc7994@gmail.com',
        phoneNumber: '012366885',
        address: 'thanh hoa',
        password: 'hello',
        description: 'Xoài là một trong 5 ngành hàng được tỉnh Đồng Tháp chọn để tổ chức lại SX theo Đề án Tái cơ cấu ngành nông nghiệp.'
      }]
      Promise.all(
        currentCooperative.map(item => {
          return Cooperative.create(item)
            .then(mangotree => {
              return mangotree
            })
            .catch(error => {
              return error
            })
        })).then(result => {
        // console.log(result)
        console.log('result Cooperative')
        seedMangoTree(result)
      }).catch(error => {
        console.log(error)
      })
    })
  })
}

export const seedMangoTree = async (cooperative) => {
  await new Promise((resolve, reject) => {
    console.log('seedMangoTree')
    let data1 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/buoi-nam-roi.jpg')))
    const logo1 = data1.toString('base64')
    let data2 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/xoai.jpg')))
    const logo2 = data2.toString('base64')
    let data3 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/sau_rieng.jpg')))
    const logo3 = data3.toString('base64')
    let data4 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/thanh_long_1.jpg')))
    const logo4 = data4.toString('base64')
    let data5 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/cay nah.jpg')))
    const logo5 = data5.toString('base64')
    let data6 = fs.readFileSync(path.resolve(path.join(__dirname, './assets/cay-vu-sua-1.jpg')))
    const logo6 = data6.toString('base64')
    const currentMangotree = [
      {
        'name': 'Bưởi năm roi',
        'numberId': '112',
        'cooperativeId': cooperative[0]._id,
        'address': '43/7 Vĩnh Phước, Châu Thành, Hậu Giang',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': '3.000.000 vnđ',
        'stateTree': [{
          'image': [logo1],
          'quantity': '12 kg/1 năm',
          'description': 'gia tot'
        }],
        summary: 'Bưởi (danh pháp hai phần: Citrus maxima (Merr., Burm. f.), hay Citrus grandis L., là một loại quả thuộc chi Cam chanh, thường có màu xanh lục nhạt cho tới vàng khi chín, có múi dày, tép xốp, có vị ngọt hoặc chua ngọt tùy loại. Bưởi có nhiều kích thước tùy giống, chẳng hạn bưởi Đoan Hùng chỉ có đường kính độ 15 cm, trong khi bưởi Năm Roi, bưởi Tân Triều (Biên Hòa), bưởi da xanh (Bến Tre) và nhiều loại bưởi khác thường gặp ở Việt Nam, Thái Lan có đường kính khoảng 18–20 cm.',
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019'
      },
      {
        'name': 'Xoài hòa lộc',
        'numberId': '2',
        'cooperativeId': cooperative[0]._id,
        'address': '12/22 Nguyễn Tiến, Tiền Giang',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': '12 000 vnđ',
        'stateTree': [{
          'image': [logo2],
          'quantity': '12 kg/1 năm',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        summary: 'Xoài là một loại trái cây vị ngọt thuộc chi Xoài, bao gồm rất nhiều quả cây nhiệt đới, được trồng chủ yếu như trái cây ăn được. Phần lớn các loài được tìm thấy trong tự nhiên là các loại xoài hoang dã. Tất cả đều thuộc họ thực vật có hoa Anacardiaceae. Xoài có nguồn gốc ở Nam Á và Đông Nam Á, từ đó nó đã được phân phối trên toàn thế giới để trở thành một trong những loại trái cây được trồng hầu hết ở vùng nhiệt đới. Mật độ cao nhất của chi Xoài (Magifera) ở phía tây của Malesia (Sumatra, Java và Borneo) và ở Myanmar và Ấn Độ.[1] Trong khi loài Mangifera khác (ví dụ như xoài ngựa, M. Foetida) cũng được phát triển trên cơ sở địa phương hơn, Mangifera indica - "xoài thường" hoặc "xoài Ấn Độ" - là cây xoài thường chỉ được trồng ở nhiều vùng nhiệt đới và cận nhiệt đới. Nó có nguồn gốc ở Ấn Độ và Myanmar.[2] Nó là hoa quả quốc gia của Ấn Độ, Pakistan, Philippines, và cây quốc gia của Bangladesh.[3] Trong một số nền văn hóa, trái cây và lá của nó được sử dụng như là nghi lễ trang trí tại các đám cưới, lễ kỷ niệm, và nghi lễ tôn giáo.'
      },
      {
        'name': 'Sầu riêng tây ninh',
        'numberId': '2',
        'cooperativeId': cooperative[1]._id,
        'address': 'Nam bac',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': 12,
        'stateTree': [{
          'image': [logo3],
          'quantity': '12 kg/1 năm',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        summary: 'Chi Sầu riêng (danh pháp khoa học: Durio) là một chi thực vật thuộc họ Cẩm quỳ (Malvaceae),[3][4] (mặc dù một số nhà phân loại học đặt Durio vào một họ riêng biệt, Durionaceae[3]), được biết đến rộng rãi tại Đông Nam Á. Quả sầu riêng được nhiều người ở Đông Nam Á xem như là "vua của các loại trái cây". Nó có đặc điểm là kích thước lớn, mùi mạnh, và nhiều gai nhọn bao quanh vỏ. Quả có thể đạt 30 xentimét (12 in) chiều dài và 15 xentimét (6 in) đường kính, thường nặng một đến ba kilogram (2 đến 7 lb). Tùy thuộc vào từng loài mà quả có hình dáng từ thuôn đến tròn, màu vỏ từ xanh lục đến nâu, màu thịt quả từ vàng nhạt đến đỏ.        Thịt quả có thể ăn được, và tỏa ra một mùi đặc trưng, nặng và nồng, ngay cả khi vỏ quả còn nguyên. Một số người thấy sầu riêng có một mùi thơm ngọt ngào dễ chịu, nhưng một số khác lại không chịu nổi và khó chịu với cái mùi này. Mùi hương của sầu riêng tạo nên những phản ứng từ mê mẫn cho đến kinh tởm mãnh liệt, và được mô tả như mùi hành tây thối, nhựa thông hoặc nước cống. Do mùi của sầu riêng ám rất lâu cho nên nó bị cấm mang vào một số khách sạn và phương tiện giao thông công cộng ở Đông Nam Á.'
      },
      {
        'name': 'Thanh Long Ninh Thuận',
        'numberId': '2',
        'cooperativeId': cooperative[2]._id,
        'address': 'Phước Đại, Bác Ái, Ninh Thuận',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': '400.000 vnđ',
        'stateTree': [{
          'image': [logo4],
          'quantity': '12 kg/1 năm',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        summary: 'Thanh long một loài cây được trồng chủ yếu để lấy quả và cũng là tên của một vài chi của họ xương rồng. Thanh long là loài thực vật bản địa tại México, các nước Trung Mỹ và Nam Mỹ. Hiện nay, các loài cây này cũng được trồng ở các nước trong khu vực Đông Nam Á như Việt Nam, Malaysia, Thái Lan, Philippines, Indonesia (đặc biệt là ở miền tây đảo Java); miền nam Trung Quốc, Đài Loan và một số khu vực khác.'
      },
      {
        'name': 'Nhãn lồng Hưng Yên',
        'numberId': '22',
        'cooperativeId': cooperative[2]._id,
        'address': 'Nam bac',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Nhãn',
        'price': '2.375.00 vnđ',
        'stateTree': [{
          'image': [logo5],
          'quantity': '12 kg/1 năm',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        summary: 'Nhãn (danh pháp hai phần: Dimocarpus longan) (chữ Hán: 龙眼/龍眼; âm Hán Việt: "long nhãn"; nghĩa là "mắt rồng" vì hạt có màu đen bóng) là loài cây cận nhiệt đới lâu năm thuộc họ Bồ hòn (Sapindaceae), có nguồn gốc miền nam Trung Quốc. Loài này còn được gọi là quế viên (桂圆) trong tiếng Trung, lengkeng trong tiếng Indonesia, mata kucing trong tiếng Mã Lai. Cây cao 5–10 m. Vỏ cây xù xì, có màu xám. Thân nhiều cành, lá um tùm xanh tươi quanh năm. Lá kép hình lông chim, mọc so le, gồm 5 đến 9 lá chét hẹp, dài 7–20 cm, rộng 2,5–5 cm. Mùa xuân vào các tháng 2, 3, 4 ra hoa màu vàng nhạt, mọc thành chùm ở đầu cành hay kẽ lá, đài 5-6 răng, tràng 5-6, nhị 6-10, bầu 2-3 ô. Quả tròn có vỏ ngoài màu vàng xám, hầu như nhẵn. Hạt đen nhánh, có áo hạt màu trắng bao bọc. Mùa quả là vào khoảng tháng 7-8. Cây nhãn tương đối chịu rét hơn so với các cây cùng họ như vải, đồng thời cũng ít kén đất hơn.'
      },
      {
        'name': 'Vũ Sữa Lò Rèn',
        'numberId': '22',
        'cooperativeId': cooperative[3]._id,
        'address': 'Vĩnh Kĩm, Châu Thành, TIền Giang',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': '1.300.00 vnđ',
        'stateTree': [{
          'image': [logo6],
          'quantity': '12 kg/1 năm',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        summary: 'Cây vú sữa có tên khoa học là Chrysophyllum cainino[2], thuộc họ Hồng xiêm (Sapotaceae)[3] (trước đây vú sữa được coi là thuộc bộ Thị: Ebenales). Cây vú sữa có nguồn gốc ở đảo Antilles và châu Mỹ nhiệt đới[3]. Đây là loại cây trồng lớn nhanh, thân dẻo, tán lá rộng, chiều cao lên tới từ 10 - 15 mét. Trái vú sữa to khoảng một nắm tay, da màu xanh, khi chín chuyển sang màu hồng nhạt, ăn rất ngon[2]. Cây vú sữa còn được đưa vào danh mục cây trồng làm cảnh trong khu nhà biệt thự của các thành phố[3].'
      }]
    Promise.all(
      currentMangotree.map(item => {
        return Mangotree.create(item)
          .then(mangotree => {
            return mangotree
          })
          .catch(error => {
            return error
          })
      })).then(result => {
      // console.log(result)
      console.log('Result seedMangoTree')
    }).catch(error => {
      console.log(error)
    })
  })
}
