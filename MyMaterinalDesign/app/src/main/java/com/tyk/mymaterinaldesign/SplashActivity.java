package com.tyk.mymaterinaldesign;

import android.animation.ArgbEvaluator;
import android.content.Intent;
import android.content.res.TypedArray;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.jaeger.library.StatusBarUtil;

public class SplashActivity extends AppCompatActivity {


    private RelativeLayout mRootLayout;

    private ViewPager mViewPager;

    private LinearLayout ll;

    private int colorBg[];

    //底部小点的图片
    private ImageView[] points;

    //记录当前选中位置
    private int currentIndex;


    private ArgbEvaluator mArgbEvaluator;

    private int barAlpha = 0;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if ((getIntent().getFlags() & Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT) != 0) {
            finish();
            return;
        }

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }

        setContentView(R.layout.activity_splash);

        initView();
        initData();
    }

    private void initView() {
        mRootLayout = (RelativeLayout) findViewById(R.id.rl_root);
        mViewPager = (ViewPager) findViewById(R.id.viewpager);
        ll = (LinearLayout) findViewById(R.id.ll);
        StatusBarUtil.setColor(this, ContextCompat.getColor(this, R.color.light_green_500), barAlpha);
        mArgbEvaluator = new ArgbEvaluator();
        colorBg = getResources().getIntArray(R.array.splash_bg);
        final IntroPager introPager = new IntroPager(R.array.splash_icon, R.array.splash_desc);
        mViewPager.setAdapter(introPager);

    }

    private void initData() {


        //初始化底部小点
        initPoint();
        initPager();

    }

    private void initPoint() {

        points = new ImageView[4];

        //循环取得小点图片
        for (int i = 0; i < 4; i++) {
            //得到一个LinearLayout下面的每一个子元素
            points[i] = (ImageView) ll.getChildAt(i);
            //默认都设为灰色
            points[i].setEnabled(true);
            //给每个小点设置监听
            points[i].setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    int position = (Integer)view.getTag();
                    setCurView(position);
                    setCurDot(position);
                }


            });
            //设置位置tag，方便取出与当前位置对应
            points[i].setTag(i);
        }

        //设置当面默认的位置
        currentIndex = 0;
        //设置为白色，即选中状态
        points[currentIndex].setEnabled(false);

    }

    private void initPager() {

        mViewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
                int color = (int) mArgbEvaluator.evaluate(positionOffset, colorBg[position % colorBg.length],
                        colorBg[(position + 1) % colorBg.length]);
                StatusBarUtil.setColor(SplashActivity.this, color, barAlpha);
                mRootLayout.setBackgroundColor(color);
            }
            @Override
            public void onPageSelected(int position) {
                //设置底部小点选中状态
                setCurDot(position);
                switch (position) {
                    case 0:
                        ll.setVisibility(View.VISIBLE);
                        break;
                    case 1:
                        ll.setVisibility(View.VISIBLE);
                        break;
                    case 2:
                        ll.setVisibility(View.VISIBLE);
                        break;
                    case 3:
                        ll.setVisibility(View.GONE);
                        break;
                    default:
                        break;
                }

            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });


    }

    private void setCurView(int position) {

        if (position < 0 || position >= 4) {
            return;
        }
        mViewPager.setCurrentItem(position);
    }


    private void setCurDot(int position) {
        if (position < 0 || position > 3 || currentIndex == position) {
            return;
        }
        points[position].setEnabled(false);
        points[currentIndex].setEnabled(true);
        currentIndex = position;

    }


    private class IntroPager extends PagerAdapter {

        private String[] mDescs;

        private TypedArray mIcons;

        public IntroPager(int icoImage, int des) {
            mDescs = getResources().getStringArray(des);
            mIcons = getResources().obtainTypedArray(icoImage);
        }

        @Override
        public int getCount() {
            return mIcons.length();
        }

        @Override
        public boolean isViewFromObject(View view, Object object) {
            return view == object;
        }

        @Override
        public Object instantiateItem(ViewGroup container, int position) {
            View itemLayout = getLayoutInflater().inflate(R.layout.layout_app_intro, container, false);
            ImageView mImage = (ImageView) itemLayout.findViewById(R.id.iv_img);
            TextView mTextView = (TextView) itemLayout.findViewById(R.id.tv_desc);
            Button mButton = (Button) itemLayout.findViewById(R.id.btn_launch);
            mImage.setImageResource(mIcons.getResourceId(position, 0));
            mTextView.setText(mDescs[position]);
            if (position == getCount() - 1) {
                mButton.setVisibility(View.VISIBLE);
            } else {
                mButton.setVisibility(View.GONE);
            }
            mButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(SplashActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }
            });

            container.addView(itemLayout);
            return itemLayout;
        }

        @Override
        public void destroyItem(ViewGroup container, int position, Object object) {
            container.removeView((View) object);
        }
    }

}
