package com.tyk.mymaterinaldesign;

import android.os.Bundle;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;

import com.tyk.mymaterinaldesign.adapter.MinePagerAdapter;
import com.tyk.mymaterinaldesign.fragment.FiveFragment;
import com.tyk.mymaterinaldesign.fragment.FourFragment;
import com.tyk.mymaterinaldesign.fragment.OneFragment;
import com.tyk.mymaterinaldesign.fragment.SixFragment;
import com.tyk.mymaterinaldesign.fragment.ThreeFragment;
import com.tyk.mymaterinaldesign.fragment.TwoFragment;

import org.xutils.view.annotation.ViewInject;
import org.xutils.x;

public class MineActivity extends AppCompatActivity {

    @ViewInject(R.id.abl_mine_title)
    private AppBarLayout abl_mine_title;

    @ViewInject(R.id.tb_mine_title)
    private Toolbar tb_mine_title;

    @ViewInject(R.id.tl_mine_title)
    private TabLayout tl_mine_title;

    @ViewInject(R.id.vp_mine_content)
    private ViewPager vp_mine_content;


    private Fragment[] fragments;
    private String[] tabs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mine);

        x.view().inject(this);

        initView();

        initData();
    }

    private void initData() {

        tb_mine_title.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });


    }

    private void initView() {

        //标题栏
        initToolbar();
        //数据
        initViewpager();
        //选项卡
        initTab();
    }

    private void initViewpager() {

        fragments = new Fragment[]{
                new OneFragment(),
                new TwoFragment(),
                new ThreeFragment(),
                new FourFragment(),
                new FiveFragment(),
                new SixFragment()
        };

    }

    private void initTab() {

        tabs = new String[]{
                "one",
                "two",
                "three",
                "four",
                "five",
                "six"
        };

        MinePagerAdapter adapter=new MinePagerAdapter(getSupportFragmentManager(),fragments,tabs);
        vp_mine_content.setAdapter(adapter);
        vp_mine_content.setOffscreenPageLimit(0);
        tl_mine_title.setupWithViewPager(vp_mine_content);
//        tl_mine_title.setTabMode(TabLayout.MODE_SCROLLABLE);//可滑动模式
        tl_mine_title.setTabMode(TabLayout.MODE_FIXED);//全部显示(默认)

        vp_mine_content.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {

                switch (position) {
                    case 0:

                        break;
                    case 1:

                        break;
                    case 2:
                        if (ThreeFragment.threeFragment!=null){
                            Log.e("fragment","重新加载");
                            ThreeFragment.threeFragment.initContent();
                        }
                        break;
                    case 3:

                        break;
                    case 4:

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

    private void initToolbar() {
        tb_mine_title.setTitle("关于我");
        setSupportActionBar(tb_mine_title);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }
}
