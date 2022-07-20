<template>
  <div>
    <div class="row">
      <div class="col-xxl-12">
        <div class="card">
          <div class="card-body row">
            <div class="widget col-xl-4">
              <div class="widget__item">
                <div class="widget__info">
                  <h3 class="widget__title">Hesaba Giriş Hareketleri</h3>
                  <span class="widget__desc"
                    >Gelen Havale, EFT ve Kasa İşlemleri</span
                  >
                </div>
                <span class="widget__number text-info">{{
                  accountInCount
                }}</span>
              </div>
              <div class="widget__item">
                <div class="widget__info">
                  <h3 class="widget__title">Hesaptan Çıkış Hareketleri</h3>
                  <span class="widget__desc"
                    >Giden EFT, Havale ve Kasa İşlemleri</span
                  >
                </div>
                <span class="widget__number text-danger">{{
                  accountOutCount
                }}</span>
              </div>
              <div class="widget__item">
                <div class="widget__info">
                  <h3 class="widget__title">Toplam İşlem Sayısı</h3>
                  <span class="widget__desc">Tüm hareket sayısı</span>
                </div>
                <span class="widget__number text-success">{{
                  accountInCount + accountOutCount
                }}</span>
              </div>
            </div>
            <div class="widget col-xl-4">
              <div class="widget__item">
                <div class="widget__info">
                  <h3 class="widget__title">Giriş Toplamı</h3>
                  <span class="widget__desc">Hesaba toplam giriş tutarı</span>
                </div>
                <span class="widget__number text-success">
                  {{ accountInAmountSum | formatPrice }}
                </span>
              </div>
              <div class="widget__item">
                <div class="widget__info">
                  <h3 class="widget__title">Çıkış Toplamı</h3>
                  <span class="widget__desc">Hesaptan toplam çıkış tutarı</span>
                </div>
                <span class="widget__number text-info">
                  {{ accountOutAmountSum | formatPrice }}
                </span>
              </div>
              <div class="widget__item">
                <div class="widget__info">
                  <h3 class="widget__title">Dönem Bakiyesi</h3>
                  <span class="widget__desc">Şu anki hesap bakiyesi</span>
                </div>
                <span class="widget__number text-warning">
                  {{ accountTotalAmountSum | formatPrice }}
                </span>
              </div>
            </div>
            <div class="widget col-xl-4">
              <div class="widget__item row">
                <div class="widget__info col-md-7">
                  <h3 class="widget__title">
                    Devir Bakiye
                  </h3>
                  <span class="widget__desc">
                    Önceki günden gelen devir bakiyesi
                  </span>
                </div>
                <span class="widget__number text-success col-md-5">
                  {{ sumTransferAmount | formatPrice }}
                </span>
              </div>
              <div class="widget__item row">
                <div class="widget__info col-md-7">
                  <h3 class="widget__title">Bakiye</h3>
                  <span class="widget__desc">
                    Devir bakiye ve raporlanan işlemlerle birlikte son bakiye
                  </span>
                </div>
                <span class="widget__number text-primary col-md-5">
                  {{ sumAmount | formatPrice }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardTop",
  props: {
    counter: Number,
    accountInCount: {
      type: [Number],
      required: true,
      default: function() {
        return 0;
      }
    },
    accountOutCount: {
      type: [Number],
      required: true,
      default: function() {
        return 0;
      }
    },
    accountInAmountSum: {
      type: [Number],
      required: true,
      default: function() {
        return 0;
      }
    },
    accountOutAmountSum: {
      type: [Number],
      required: true,
      default: function() {
        return 0;
      }
    },
    accountTotalAmountSum: {
      type: [Number],
      required: true,
      default: function() {
        return 0;
      }
    },
    sumAmount: {
      type: [Number],
      required: true,
      default: function() {
        return 0;
      }
    },
    sumTransferAmount: {
      type: [Number],
      required: true,
      default: function() {
        return 0;
      }
    }
  }
};
</script>

<style scoped>
.card-body {
  padding: 1.25rem !important;
}

.widget {
  padding: 15px;
  border-right: 1px solid #f3f3f3;
}

.widget:last-child {
  border-right: 0;
}

.widget .widget__item {
  padding: 1.1rem 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 0.07rem dashed #ebedf2;
}
.widget .widget__item:last-child {
  padding-bottom: 0;
}
.widget .widget__item:first-child {
  padding-top: 0;
}
.widget .widget__item .widget__info .widget__title {
  font-size: 1rem;
  font-weight: 500;
  color: #595d6e;
}
.widget .widget__item .widget__info .widget__desc {
  font-size: 1rem;
  font-weight: normal;
  color: #74788d;
}
.widget .widget__item .widget__number {
  font-size: 1.1rem;
  font-weight: 600;
  color: #74788d;
}
.widget .widget__item:last-child {
  border-bottom: 0;
}
</style>
