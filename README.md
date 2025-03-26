# AquiWeb E2E Test Automation Project

Bu proje, AquiWeb web uygulamasının end-to-end (E2E) test otomasyonunu içermektedir. Cypress test framework'ü kullanılarak geliştirilmiştir.

## 🛠 Teknolojiler & Araçlar

- [Cypress](https://www.cypress.io/) - E2E Test Framework
- [Node.js](https://nodejs.org/) - JavaScript Runtime
- [Jenkins](https://jenkins.io/) - CI/CD Pipeline
- [Allure Report](http://allure.qatools.ru/) - Test Raporlama
- [Cucumber](https://cucumber.io/) - BDD Framework

## 🚀 Kurulum

### Ön Gereksinimler

- Node.js (v14 veya üzeri)
- npm (Node Package Manager)
- Java JDK (Allure Report için)
- Jenkins (CI/CD için)
- ffmpeg (Video işleme için)

### Kurulum Adımları

1. Projeyi klonlayın:
```bash
git clone https://github.com/hakantetik44/AquiWeb_E2E.git
cd AquiWeb_E2E
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

## 🏃‍♂️ Testleri Çalıştırma

### Lokalde Çalıştırma

```bash
# Test Runner'ı açmak için
npm run cypress:open

# Testleri headless modda çalıştırmak için
npm run test

# Allure raporu oluşturmak için
npm run allure:report

# Allure raporunu görüntülemek için
npm run allure:open
```

### Jenkins Pipeline

Jenkins pipeline'ı aşağıdaki aşamaları içerir:

1. **Setup**: Gerekli klasörlerin oluşturulması ve bağımlılıkların yüklenmesi
2. **Test**: E2E testlerinin çalıştırılması
3. **Process Videos**: Test videolarının işlenmesi
4. **Generate Reports**: Allure ve Cucumber raporlarının oluşturulması

## 📊 Raporlama

Proje iki farklı raporlama sistemi kullanmaktadır:

### Allure Report
- Detaylı test adımları
- Screenshot'lar
- Video kayıtları
- Test süreleri ve istatistikler

### Cucumber Report
- BDD formatında test sonuçları
- Trend analizi
- Özellik bazlı raporlama

## 📁 Proje Yapısı 