package com.tyk.mymaterinaldesign.adapter;

import android.app.Activity;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.tyk.mymaterinaldesign.R;

/**
 * Created by Administrator on 2017/3/22 0022.
 */

public class MainAdapter extends RecyclerView.Adapter<MainAdapter.ViewHolder> implements View.OnClickListener{


    Activity activity;

    public MainAdapter(Activity activity) {
        this.activity = activity;
    }

    private OnRecyclerViewItemClickListener mOnItemClickListener = null;

    @Override
    public void onClick(View view) {
        if (mOnItemClickListener != null) {
            //注意这里使用getTag方法获取数据
            mOnItemClickListener.onItemClick(view,(String)view.getTag());
        }
    }

    public void setOnItemClickListener(OnRecyclerViewItemClickListener listener) {
        this.mOnItemClickListener = listener;
    }

    //define interface
    public static interface OnRecyclerViewItemClickListener {
        void onItemClick(View view , String data);
    }


    //获取view，并将view与holder进行绑定
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view= LayoutInflater.from(activity).inflate(R.layout.item_card,parent,false);
        LinearLayout.LayoutParams params=new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.WRAP_CONTENT);
        view.setLayoutParams(params);
        ViewHolder holder=new ViewHolder(view);
        view.setOnClickListener(this);

        return holder;
    }

    //填充数据
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {

    }

    @Override
    public int getItemCount() {
        return 12;
    }



    public class ViewHolder extends RecyclerView.ViewHolder{

        CardView cv_item_content;


        public ViewHolder(View itemView) {
            super(itemView);

            cv_item_content= (CardView) itemView.findViewById(R.id.cv_item_content);
        }
    }

}
