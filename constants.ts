
import { DaySchedule } from './types';

export const STORAGE_PREFIX = 'dora_trip_note_';
export const EXPIRY_DAYS = 30;

export const KAOHSIUNG_COORDS = {
  lat: 22.6163,
  lng: 120.3133
};

// Helper for cleaner URLs
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

export const ITINERARY_DATA: DaySchedule[] = [
  {
    date: '16/12',
    dayLabel: 'Day 1 (二)',
    items: [
      {
        id: 'd1-airport-hk',
        time: '08:30',
        name: '香港機場 (HKG)',
        address: 'Hong Kong International Airport',
        hours: '-',
        description: '抵達機場準備出發，搭乘中華航空 CI934 飛往高雄。',
        imageUrl: unsplash('1718812178582-90bd3d799a34'), // Airport
        locationQuery: 'Hong Kong International Airport'
      },
      {
        id: 'd1-flight',
        time: '10:30 - 12:00',
        name: '飛往高雄 (CI934)',
        address: '空中',
        hours: '飛行時間約 1.5 小時',
        description: '享受飛行時光，期待高雄之旅。',
        imageUrl: unsplash('1715262437769-d5a52db0d1dd'), // Plane wing
        locationQuery: 'Kaohsiung International Airport'
      },
      {
        id: 'd1-hotel',
        time: '13:30',
        name: '禾芯旅店駁二館 Check-in',
        address: '803高雄市鹽埕區新樂街124號 (近駁二)',
        hours: 'Check-in: 15:00',
        description: '抵達酒店辦理入住手續，放下行李。位於鹽埕區，交通便利。',
        imageUrl: unsplash('1670767032468-550802ace55b'), // Kaohsiung City Vibe
        locationQuery: '禾芯旅店駁二館'
      },
      {
        id: 'd1-museum',
        time: '14:30',
        name: '國立科學工藝博物館',
        address: '807高雄市三民區九如一路720號',
        hours: '09:00 - 17:00 (週一休館，請留意開放狀況)',
        description: '台灣第一座應用科學博物館，寓教於樂，適合探索科學奧秘。',
        imageUrl: unsplash('1724749793945-85dcc7b8a6af'), // Science Museum
        locationQuery: 'National Science and Technology Museum Kaohsiung'
      },
      {
        id: 'd1-nightmarket',
        time: '18:00',
        name: '六合夜市 & 愛河',
        address: '800高雄市新興區六合二路',
        hours: '17:00 - 05:00',
        description: '晚餐於六合夜市品嚐海鮮粥、木瓜牛奶等美食，隨後漫步愛河畔欣賞夜景。',
        imageUrl: unsplash('1639202182527-24f3b9587120'), // Kaohsiung Love River
        locationQuery: 'Liuhe Night Market'
      }
    ]
  },
  {
    date: '17/12',
    dayLabel: 'Day 2 (三)',
    items: [
      {
        id: 'd2-breakfast',
        time: '09:30',
        name: '酒店早餐',
        address: '禾芯旅店',
        hours: '07:00 - 10:00',
        description: '享用酒店準備的美味早餐，補充一天活力。',
        imageUrl: unsplash('1504754524776-8f4f37790ca0'), // Breakfast
        locationQuery: '禾芯旅店駁二館'
      },
      {
        id: 'd2-cijin',
        time: '11:00',
        name: '旗津風景區',
        address: '805高雄市旗津區',
        hours: '全天開放',
        description: '搭乘渡輪前往旗津。遊覽旗津老街、彩虹教堂、星空隧道，必吃海鮮大餐。',
        imageUrl: unsplash('1607138151762-54254c7a8442'), // Kaohsiung Lighthouse Cijin
        locationQuery: 'Cijin Island'
      },
      {
        id: 'd2-shinkuchan',
        time: '18:00',
        name: '新崛江商圈',
        address: '800高雄市新興區文橫二路',
        hours: '13:00 - 23:00',
        description: '南台灣的潮流聖地，各式服飾小店與街頭小吃，年輕人的最愛。',
        imageUrl: unsplash('1736517883430-53ab70cd6922'), // Night street
        locationQuery: 'Shinkuchan Shopping District'
      }
    ]
  },
  {
    date: '18/12',
    dayLabel: 'Day 3 (四)',
    items: [
      {
        id: 'd3-breakfast',
        time: '09:30',
        name: '酒店早餐',
        address: '禾芯旅店',
        hours: '07:00 - 10:00',
        description: '悠閒享用早餐。',
        imageUrl: unsplash('1513442542250-854d436a73f2'), // Breakfast
        locationQuery: '禾芯旅店駁二館'
      },
      {
        id: 'd3-zoo',
        time: '11:00',
        name: '壽山動物園',
        address: '804高雄市鼓山區萬壽路350號',
        hours: '09:00 - 17:00',
        description: '漫步空中長廊，近距離觀察動物生態，親近大自然的好去處。',
        imageUrl: unsplash('1717582740169-3c6d555df86d'), // Animals
        locationQuery: 'Shoushan Zoo'
      },
      {
        id: 'd3-ruifeng',
        time: '18:00',
        name: '瑞豐夜市',
        address: '804高雄市鼓山區裕誠路',
        hours: '17:00 - 00:00',
        description: '在地人首推的夜市！天使雞排、QQ蛋等排隊美食不容錯過。',
        imageUrl: unsplash('1542666836-2790751aafda'), // Night Market
        locationQuery: 'Ruifeng Night Market'
      }
    ]
  },
  {
    date: '19/12',
    dayLabel: 'Day 4 (五)',
    items: [
      {
        id: 'd4-breakfast',
        time: '08:30',
        name: '酒店早餐',
        address: '禾芯旅店',
        hours: '07:00 - 10:00',
        description: '吃飽喝足，準備前往遊樂園！',
        imageUrl: unsplash('1535567465397-7523840f2ae9'), // Food
        locationQuery: '禾芯旅店駁二館'
      },
      {
        id: 'd4-eda-park',
        time: '11:00',
        name: '義大遊樂世界',
        address: '840高雄市大樹區學城路一段10號',
        hours: '09:00 - 17:30',
        description: '全台唯一希臘情境主題樂園。「聖托里尼山城」超好拍，「天旋地轉」超刺激。',
        imageUrl: unsplash('1762397959129-162ed2e4a670'), // Amusement Park
        locationQuery: 'E-DA Theme Park'
      },
      {
        id: 'd4-eda-outlet',
        time: '18:00',
        name: '義大世界購物廣場',
        address: '840高雄市大樹區學城路一段12號',
        hours: '11:00 - 22:00',
        description: '血拼時間！擁有巨大摩天輪的Outlet Mall，各大品牌折扣優惠。',
        imageUrl: unsplash('1562280963-8a5475740a10'), // Mall
        locationQuery: 'E-DA Outlet Mall'
      }
    ]
  },
  {
    date: '20/12',
    dayLabel: 'Day 5 (六)',
    items: [
      {
        id: 'd5-breakfast',
        time: '09:30',
        name: '酒店早餐 / Check-out',
        address: '禾芯旅店',
        hours: 'Check-out: 11:00',
        description: '整理行李，辦理退房手續。',
        imageUrl: unsplash('1611601184963-9d1de9b79ff3'), // Lobby
        locationQuery: '禾芯旅店駁二館'
      },
      {
        id: 'd5-donut',
        time: '10:45',
        name: 'Mister Donut (三多商圈)',
        address: '高雄市前鎮區三多三路 (捷運三多商圈站)',
        hours: '11:00 - 22:00',
        description: '購買伴手禮或點心，享受著名的波堤甜甜圈。',
        imageUrl: unsplash('1527515545081-5db817172677'), // Donuts
        locationQuery: 'Mister Donut Kaohsiung Sanduo'
      },
      {
        id: 'd5-skm',
        time: '11:00',
        name: 'SKM Park Outlets 高雄草衙',
        address: '806高雄市前鎮區中安路1-1號',
        hours: '11:00 - 21:30',
        description: '搭乘捷運至草衙站。體驗鈴鹿賽道樂園，最後的購物衝刺。',
        imageUrl: unsplash('1703423064062-6f7b4e88297c'), // Fun Mall
        locationQuery: 'SKM Park Outlets'
      },
      {
        id: 'd5-sushi',
        time: '12:00',
        name: '藏壽司 (SKM Park店)',
        address: 'SKM Park 大道西3F',
        hours: '11:00 - 22:00',
        description: '午餐享用美味迴轉壽司，也可以玩扭蛋。',
        imageUrl: unsplash('1579584425555-c3ce17fd4351'), // Sushi
        locationQuery: 'Kura Sushi SKM Park'
      },
      {
        id: 'd5-airport',
        time: '16:00',
        name: '前往高雄機場',
        address: 'Kaohsiung International Airport',
        hours: '-',
        description: '搭乘捷運或計程車前往機場，辦理登機手續。',
        imageUrl: unsplash('1759132317192-189854c45e43'), // Airport
        locationQuery: 'Kaohsiung International Airport'
      },
      {
        id: 'd5-home',
        time: '18:00 - 19:45',
        name: '飛往香港 (CI935)',
        address: '空中',
        hours: '-',
        description: '帶著滿滿的戰利品與回憶，平安返家。',
        imageUrl: unsplash('1716364020115-0800909941b9'), // Night Flight
        locationQuery: 'Hong Kong International Airport'
      }
    ]
  }
];
